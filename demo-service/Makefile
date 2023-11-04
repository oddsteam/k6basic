SHELL = /bin/bash

UNAME = $(shell uname)

# Some directories
SUPER_DIR   = $(shell basename `pwd`)

COMMIT_ID = $(shell git rev-parse --short HEAD)

build:
	docker  build --tag chankx/demo-loadtest-app:$(COMMIT_ID)  .
	docker tag chankx/demo-loadtest-app:$(COMMIT_ID) chankx/demo-loadtest-app:latest
	docker push chankx/demo-loadtest-app:$(COMMIT_ID)
	docker push chankx/demo-loadtest-app:latest
 buildx:
	docker buildx build --platform linux/amd64,linux/arm64 -t chankx/demo-loadtest-app:$(COMMIT_ID) --push .
	docker buildx build --platform linux/amd64,linux/arm64 -t chankx/demo-loadtest-app:latest --push .