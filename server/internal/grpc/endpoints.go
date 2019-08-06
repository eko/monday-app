package monday

import (
	context "context"
	"os/exec"

	"github.com/eko/monday/pkg/config"
)

// GetProjects returns the project names list
func (s *Server) GetProjects(ctx context.Context, empty *Empty) (*GetProjectsResponse, error) {
	conf, err := config.Load()
	if err != nil {
		return nil, err
	}

	names := conf.GetProjectNames()

	var projects = make([]*Project, 0)
	for _, name := range names {
		projects = append(projects, &Project{Name: name})
	}

	return &GetProjectsResponse{
		Projects: projects,
	}, nil
}

// OpenConfigurationFiles returns the project names list
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
