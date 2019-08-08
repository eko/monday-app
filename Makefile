.PHONY: build build-proto

build:
	go build -o dist/monday-server server/*.go

build-proto:
	protoc -I proto/ proto/monday.proto --go_out=plugins=grpc:server/internal/grpc
