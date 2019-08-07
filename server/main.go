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

	s = monday.NewServer(conf)

	go s.Listen("52314")

	handleExitSignal()
}

func handleExitSignal() {
	stop := make(chan os.Signal, 1)
	signal.Notify(stop, os.Interrupt, syscall.SIGTERM)
	signal.Notify(stop, os.Interrupt, syscall.SIGINT)

	<-stop

	s.Stop()
}
