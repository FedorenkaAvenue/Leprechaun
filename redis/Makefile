banchmark:
	@docker exec -it leprechaun_redis redis-benchmark -q -n 100000 -c 50 -P 12

memory_usage:
	@docker exec leprechaun_redis redis-cli info memory
