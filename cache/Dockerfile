FROM redis:6.2.6-alpine3.15

ARG REDIS_PASSWORD

WORKDIR /app

COPY redis.conf ./

CMD redis-server /app/redis.conf --requirepass "${REDIS_PASSWORD}"
