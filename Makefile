build:
	@docker-compose up --build -d

start:
	@docker-compose start

stop:
	@docker-compose stop

logs:
	@docker-compose logs -f

open_image_hosting:
	@sudo xdg-open /var/lib/docker/volumes/leprechaun_image_hosting/_data
