index_products:
	@docker exec leprechaun_se indexer products --config /etc/manticoresearch/manticore.conf --rotate

index_categories:
	@docker exec leprechaun_se indexer categories --config /etc/manticoresearch/manticore.conf --rotate

index_all:
	@docker exec leprechaun_se indexer --all --config /etc/manticoresearch/manticore.conf --rotate
