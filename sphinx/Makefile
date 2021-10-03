index_products:
	@docker exec leprechaun_sphinx indexer products_index --config /etc/sphinx/sphinx.conf --rotate

index_all:
	@docker exec leprechaun_sphinx indexer --all --config /etc/sphinx/sphinx.conf --rotate

clear_logs:
	@truncate -s 0 ./log/query.log ; truncate -s 0 ./log/searchd.log
