banchmark:
	@docker exec -it leprechaun_db_cache redis-benchmark -q -n 100000 -c 50 -P 12

memory_usage:
	@docker exec leprechaun_db_cache redis-cli info memory
