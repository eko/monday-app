package main

import (
	monday "./internal/grpc"
)

func main() {
	monday.NewServer().Listen("52314")
}
