package monday

import (
	"fmt"
	"net"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

// Server is the gRPC Server.
type Server struct {
	ready  bool
	server *grpc.Server
}

// NewServer create a Server.
func NewServer() *Server {
	return &Server{}
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

// Stop stops the server.
func (s *Server) Stop() {
	s.server.GracefulStop()
	s.ready = false
}

// IsReady tells you if the server is ready.
func (s *Server) IsReady() bool {
	return s.ready
}
