DOCKER_PROD_CONF_PATH = -f docker-compose.override.yaml -f docker-compose.prod.yaml

build_single:
	@docker compose up -d --build --no-deps --force-recreate $(args)

build_prod:
	@make _cp_admin_client_static
	@docker compose ${DOCKER_PROD_CONF_PATH} up --build -d

build_prod_single:
	@docker compose ${DOCKER_PROD_CONF_PATH} up --build -d --no-deps --force-recreate $(args)

image_hosting:
	@sudo xdg-open /var/lib/docker/volumes/leprechaun_image_hosting/_data

_cp_admin_client_static:
	@rm -rf ./server/admin
	@mkdir -p ./server/admin/ && cp -r ./clients/admin/ ./server/

translation:
	@echo 'Move translations⏳...'
	@cp -r ./translations/dist/client_user/. ./clients/user/src/public/locales
	@cp -r ./translations/dist/client_admin/. ./clients/admin/public/locales
