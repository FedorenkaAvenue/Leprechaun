ARG REDIS_PASSWORD

FROM redis:6.2.6-alpine3.15

WORKDIR /app

COPY redis.conf ./

CMD sh -c "exec redis-server /app/redis.conf --requirepass \"$REDIS_PASSWORD\""
