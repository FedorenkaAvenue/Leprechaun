# развернуть DB на сервере
dump_deploy:
	@echo "Deploying dump..."
	@docker exec apple_pie_postgres psql -U postgres postgres -f backup/dump.sql
	@echo "Success completed!"

# скачать актуальный дамп из DB
dump_pull:
	@echo "Pulling fresh dump..."
	@docker exec apple_pie_postgres pg_dump -U postgres --data-only -f ./temp_dump.sql && \
		docker cp apple_pie_postgres:/app/temp_dump.sql ./backup/dump.sql
	@echo "Success completed!"

schema_deploy:
	@echo "Deploying schema..."
	@docker exec apple_pie_postgres psql -U postgres -f ./schema.sql
	@echo "Success completed!"
