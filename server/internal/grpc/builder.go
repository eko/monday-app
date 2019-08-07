package monday

import "github.com/eko/monday/pkg/config"

func buildGrpcApplications(applications []*config.Application) []*Application {
	result := make([]*Application, 0)

	for _, application := range applications {
		result = append(result, &Application{
			Name: application.Name,
		})
	}

	return result
}

func buildGrpcForwards(forwards []*config.Forward) []*Forward {
	result := make([]*Forward, 0)

	for _, forward := range forwards {
		result = append(result, &Forward{
			Name: forward.Name,
		})
	}

	return result
}
