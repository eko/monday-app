.PHONY: build build-proto

build:
	go build -o build/server server/*.go

build-proto:
	protoc -I proto/ proto/monday.proto --go_out=plugins=grpc:server/internal/grpc
	protoc ./proto/monday.proto  --js_out=import_style=commonjs,binary:./src/grpc
