CONTAINER_DB_0_NAME=leprechaun_db

# скачать актуальный дамп из DB
dump_pull:
	@echo "Pulling fresh dump..."
	@docker exec ${CONTAINER_DB_0_NAME} pg_dumpall -U postgres --data-only -f ./temp_dump.sql && \
		mkdir -p ./backup && \
		docker cp ${CONTAINER_DB_0_NAME}:/app/temp_dump.sql ./backup/$(shell date -Iseconds).sql
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
