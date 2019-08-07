package monday

import (
	"fmt"
	"net"

	"github.com/eko/monday/pkg/config"
	"github.com/eko/monday/pkg/forwarder"
	"github.com/eko/monday/pkg/proxy"
	"github.com/eko/monday/pkg/runner"
	"github.com/eko/monday/pkg/ui"
	"github.com/eko/monday/pkg/watcher"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

var (
	runnerComponent    runner.RunnerInterface
	forwarderComponent forwarder.ForwarderInterface
	proxyComponent     proxy.ProxyInterface
	watcherComponent   watcher.WatcherInterface

	logsView     ui.ViewInterface
	forwardsView ui.ViewInterface
	proxyView    ui.ViewInterface
)

// Server is the gRPC Server.
type Server struct {
	ready  bool
	conf   *config.Config
	server *grpc.Server
}

// NewServer create a Server.
func NewServer(conf *config.Config) *Server {
	return &Server{
		conf: conf,
	}
}

// Listen start the server.
func (s *Server) Listen(port string) {
	endpoint := fmt.Sprintf(":%s", port)

	s.server = grpc.NewServer()
	RegisterMondayServiceServer(s.server, s)
	reflection.Register(s.server)

	lis, err := net.Listen("tcp", endpoint)
	if err != nil {
		panic(fmt.Sprintf("Failed to listen: %v", err))
	}

	fmt.Println("Starting gRPC server")
	s.ready = true

	if err := s.server.Serve(lis); err != nil {
		s.ready = false
		panic(err)
	}
}

// stopComponents stops currently active components
func (s *Server) stopComponents() {
	forwarderComponent.Stop()
	proxyComponent.Stop()
	runnerComponent.Stop()
	watcherComponent.Stop()
}

// Stop stops the server.
func (s *Server) Stop() {
	s.stopComponents()
	s.server.GracefulStop()
	s.ready = false
}

// IsReady tells you if the server is ready.
func (s *Server) IsReady() bool {
	return s.ready
}
