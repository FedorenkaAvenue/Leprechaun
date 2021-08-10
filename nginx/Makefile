generate_user:
	@docker exec leprechaun_nginx htpasswd -b /etc/nginx/.http_auth $(user) $(pass)

img_pull:
	@docker cp leprechaun_nginx:/var/www/img ./
