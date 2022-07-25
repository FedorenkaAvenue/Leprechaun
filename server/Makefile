generate_user:
	@docker exec leprechaun_server htpasswd -b /etc/nginx/.http_auth $(user) $(pass)

img_pull:
	@docker cp leprechaun_server:/var/www/img ./
