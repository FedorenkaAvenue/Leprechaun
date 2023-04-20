FROM postgres:13.3-alpine3.14

WORKDIR /app

COPY ./init.sh /docker-entrypoint-initdb.d/
COPY ./dump_pull.sh ./
COPY ./postgresql.conf ./
COPY ./replica_state.sh ./

CMD [ "postgres", "-c", "config_file=/app/postgresql.conf" ]
