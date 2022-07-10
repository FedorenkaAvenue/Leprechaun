build:
	@docker compose up --build -d

build_single:
	@docker-compose up -d --build --no-deps --force-recreate $(args)

build_prod:
	@make _cp_admin_client_static
	@docker compose -f docker-compose.override.yaml -f docker-compose.prod.yaml up --build -d

build_prod_single:
	@docker-compose up -d --build --no-deps --force-recreate $(args)

start:
	@docker compose start

stop:
	@docker compose stop

logs:
	@docker compose logs -f

open_image_hosting:
	@sudo xdg-open /var/lib/docker/volumes/leprechaun_image_hosting/_data

migrations:
	@yarn --cwd ./server migrations:run

manticore_index:
	@make -f ./manticore/Makefile index_all

_cp_admin_client_static:
	@rm -rf ./nginx/admin
	@mkdir -p ./nginx/admin/ && cp -r ./admin/ ./nginx/
