start:
	@./scripts/docker.sh start

stop:
	@./scripts/docker.sh stop

build:
	@./scripts/docker.sh build

down:
	@./scripts/docker.sh down

translation:
	@cd ./utils/translations && make move

protos:
	@cd ./utils/proto_gen && make move
