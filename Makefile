build:
	@docker compose up --build -d

start:
	@docker compose start

stop:
	@docker compose stop

logs:
	@docker compose logs -f

remote_test_build:
	@docker compose -f docker-compose.override.yaml -f docker-compose.test.yaml up --build -d

open_image_hosting:
	@sudo xdg-open /var/lib/docker/volumes/leprechaun_image_hosting/_data

migrations:
	@yarn --cwd ./server migrations:run

manticore_index:
	@make -f ./manticore/Makefile index_all
