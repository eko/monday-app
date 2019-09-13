package monday

import (
	context "context"
	"os"
	"os/exec"
	"syscall"

	serverui "github.com/eko/monday-app/server/internal/ui"

	"github.com/eko/monday/pkg/config"
	"github.com/eko/monday/pkg/forwarder"
	"github.com/eko/monday/pkg/hostfile"
	"github.com/eko/monday/pkg/proxy"
	"github.com/eko/monday/pkg/runner"
	"github.com/eko/monday/pkg/watcher"
)

// GetProjects returns the project names list
func (s *Server) GetProjects(ctx context.Context, empty *Empty) (*GetProjectsResponse, error) {
	return &GetProjectsResponse{
		Names: s.conf.GetProjectNames(),
	}, nil
}

// RunProject runs the given project name
func (s *Server) RunProject(ctx context.Context, req *RunProjectRequest) (*RunProjectResponse, error) {
	// Retrieve project by its name
	project, err := s.conf.GetProjectByName(req.GetName())
	if err != nil {
		panic(err)
	}

	// Initializes hosts file manager
	hostfile, err := hostfile.NewClient()
	if err != nil {
		panic(err)
	}

	// Prepare views
	logsView = serverui.NewView("runner", "Runner")
	forwardsView = serverui.NewView("forwarder", "Forwarder")
	proxyView = serverui.NewView("proxy", "Proxy")

	// Prepare components and run project
	proxyComponent = proxy.NewProxy(proxyView, hostfile)
	runnerComponent = runner.NewRunner(logsView, proxyComponent, project)
	forwarderComponent = forwarder.NewForwarder(forwardsView, proxyComponent, project)

	watcherComponent = watcher.NewWatcher(runnerComponent, forwarderComponent, s.conf.Watcher, project)
	watcherComponent.Watch()

	return &RunProjectResponse{
		Project: &Project{
			Name:         project.Name,
			Applications: buildGrpcApplications(project.Applications),
			Forwards:     buildGrpcForwards(project.Forwards),
		},
	}, nil
}

// GetLogs returns the logs of the given view name
func (s *Server) GetLogs(ctx context.Context, req *GetLogsRequest) (*GetLogsResponse, error) {
	var view *serverui.View

	switch req.GetView() {
	case "runner":
		view = logsView.(*serverui.View)
	case "forwarder":
		view = forwardsView.(*serverui.View)
	case "proxy":
		view = proxyView.(*serverui.View)
	}

	content := view.GetView().ReadAll()

	return &GetLogsResponse{
		Content: string(content),
	}, nil
}

// StopProject stops the currently active project
func (s *Server) StopProject(ctx context.Context, empty *Empty) (*Empty, error) {
	s.stopComponents()
	return &Empty{}, nil
}

// InitConfigurationFile initializes a configuration file
func (s *Server) InitConfigurationFile(ctx context.Context, empty *Empty) (*Empty, error) {
	if _, err := os.Stat(config.Filepath); os.IsExist(err) {
		return s.OpenConfigurationFiles(ctx, empty)
	}

	f, err := os.Create(config.Filepath)
	f.Close()
	if err != nil {
		return nil, err
	}

	command := exec.Command("open", config.Filepath)
	if err := command.Start(); err != nil {
		return nil, err
	}

	return &Empty{}, nil
}

// OpenConfigurationFiles opens the configuration files in the  prefered editor
func (s *Server) OpenConfigurationFiles(ctx context.Context, empty *Empty) (*Empty, error) {
	files := config.FindMultipleConfigFiles()

	// Check for single configuration file
	err := config.CheckConfigFileExists()
	if err != nil {
		return nil, err
	}

	if len(files) == 0 {
		files = []string{config.Filepath}
	}

	command := exec.Command("open", files...)

	if err := command.Start(); err != nil {
		return nil, err
	}

	return &Empty{}, nil
}

// ReloadConfiguration initializes a configuration file
func (s *Server) ReloadConfiguration(ctx context.Context, empty *Empty) (*Empty, error) {
	conf, err := config.Load()
	if err != nil {
		return nil, err
	}

	s.conf = conf

	return &Empty{}, nil
}

// Quit quits the server
func (s *Server) Quit(ctx context.Context, empty *Empty) (*Empty, error) {
	s.stop <- syscall.SIGINT

	return &Empty{}, nil
}
