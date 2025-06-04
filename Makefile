DOCKER_PROD_CONF_PATH = -f docker-compose.override.yaml -f docker-compose.prod.yaml

build_single:
	@docker compose up -d --build --no-deps --force-recreate $(args)

build_prod:
	@make _cp_admin_client_static
	@docker compose ${DOCKER_PROD_CONF_PATH} up --build -d

build_prod_single:
	@docker compose ${DOCKER_PROD_CONF_PATH} up --build -d --no-deps --force-recreate $(args)

translation:
	@cd ./utils/translations && make move

protos:
	@cd ./utils/proto_gen && make move
