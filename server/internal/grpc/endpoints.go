package monday

import (
	context "context"

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
