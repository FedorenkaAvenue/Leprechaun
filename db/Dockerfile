FROM postgres:13.3-alpine3.14

ARG DB_FOLDER

WORKDIR /app

COPY ${DB_FOLDER}/postgresql.conf ./

CMD [ "postgres", "-c", "config_file=/app/postgresql.conf" ]
