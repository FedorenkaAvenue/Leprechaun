CONTAINER_DB_0_NAME=leprechaun_db_0
CONTAINER_DB_1_NAME=leprechaun_db_1

dump_pull:
	@echo "Pulling fresh dump..."
	@docker exec ${CONTAINER_DB_1_NAME} sh /app/dump_pull.sh

replication_state:
	@echo "Publisher's stats:"
	@docker exec ${CONTAINER_DB_0_NAME} sh /app/replica_state.sh;
	@echo "Subscriber's stats:"
	@docker exec ${CONTAINER_DB_1_NAME} sh /app/replica_state.sh;
