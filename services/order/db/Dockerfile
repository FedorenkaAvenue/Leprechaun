FROM postgres:13.3-alpine3.14

WORKDIR /app

# COPY ./init.sh /docker-entrypoint-initdb.d/
COPY ./postgresql.conf ./
COPY ./pg_hba.conf ./
# COPY ./replica_state.sh ./

CMD [ "postgres", "-c", "config_file=/app/postgresql.conf" ]
