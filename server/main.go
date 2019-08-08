package main

import (
	"os"
	"os/signal"
	"syscall"

	monday "./internal/grpc"
	"github.com/eko/monday/pkg/config"
)

var (
	s *monday.Server
)

func main() {
	conf, err := config.Load()
	if err != nil {
		panic(err)
	}

	stop := make(chan os.Signal, 1)
	s = monday.NewServer(conf, stop)

	go s.Listen("52314")

	handleExitSignal(stop)
}

func handleExitSignal(stop chan os.Signal) {
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)
	signal.Notify(stop, os.Interrupt, syscall.SIGINT)
	signal.Notify(stop, os.Interrupt, syscall.SIGKILL)

	<-stop

	s.Stop()
}
