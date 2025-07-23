start:
	@./scripts/docker.loc.sh start

stop:
	@./scripts/docker.loc.sh stop

restart:
	@./scripts/docker.loc.sh restart

build:
	@./scripts/docker.loc.sh build

down:
	@./scripts/docker.loc.sh down

translation:
	@cd ./utils/translations && make move
