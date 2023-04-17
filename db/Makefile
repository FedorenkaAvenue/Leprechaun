CONTAINER_DB_0_NAME=leprechaun_db_0
CONTAINER_DB_1_NAME=leprechaun_db_1

dump_pull:
	@echo "Pulling fresh dump..."
	@docker exec ${CONTAINER_DB_1_NAME} pg_dumpall -U postgres --data-only -f ./temp_dump.sql && \
		mkdir -p ./backup && \
		docker cp ${CONTAINER_DB_1_NAME}:/app/temp_dump.sql ./backup/$(shell date -Iseconds).sql
	@echo "Success completed!"

# развернуть DB на сервере
# dump_deploy:
# 	@echo "Deploying dump..."
# 	@docker exec ${CONTAINER_DB_0_NAME} psql -U postgres postgres -f backup/dump.sql
# 	@echo "Success completed!"

# schema_deploy:
# 	@echo "Deploying schema..."
# 	@docker exec ${CONTAINER_DB_0_NAME} psql -U postgres -f ./schema.sql
# 	@echo "Success completed!"

replication_state:
	@echo "Publication's stats:"
	@docker exec ${CONTAINER_DB_0_NAME} psql -U postgres -d postgres -c '\dRp' -c 'SELECT client_addr, state, application_name FROM pg_stat_replication';
	@echo "Subscriber's stats:"
	@docker exec ${CONTAINER_DB_1_NAME} psql -U postgres -d postgres -c '\dRs' -c 'SELECT * FROM pg_stat_subscription;';
