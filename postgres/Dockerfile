FROM postgres:13.3-alpine3.14

WORKDIR /app

# COPY backup ./backup
# COPY schema.sql /docker-entrypoint-initdb.d/
COPY postgresql.conf ./

CMD [ "postgres", "-c", "config_file=/app/postgresql.conf" ]
