SHELL = /bin/bash

UNAME = $(shell uname)

# Some directories
SUPER_DIR   = $(shell basename `pwd`)

COMMIT_ID = $(shell git rev-parse --short HEAD)

build:
	docker build -t chankx/demo-nginxlb:$(COMMIT_ID) .
	docker tag chankx/demo-nginxlb:$(COMMIT_ID) chankx/demo-nginxlb:latest
	docker push chankx/demo-nginxlb:$(COMMIT_ID)
	docker push chankx/demo-nginxlb:latest