FROM postgres:alpine

WORKDIR /app

# COPY backup ./backup
# COPY schema.sql /docker-entrypoint-initdb.d/
COPY postgresql.conf ./

CMD postgres -c config_file=/app/postgresql.conf
