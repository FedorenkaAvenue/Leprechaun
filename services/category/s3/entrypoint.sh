#!/bin/sh

### PARAMS
# 1: user name
# 2: user password
# 3: API port
# 4: API UI port

# param 1: server port
wait_for_minio() {
    echo "Wait fo running MinIO..."
    while ! curl -s http://localhost:"$1"/minio/health/live >/dev/null; do
        sleep 1
    done
    echo "MinIO is ready!"
}

# TMP server run
minio server --console-address ":$4" /data &
MINIO_PID=$!

wait_for_minio "$3"

mc alias set local http://localhost:9000 "$1" "$2"
mc mb local/category-icons
mc anonymous set public local/category-icons

# kill TMP server
kill $MINIO_PID
sleep 2

exec minio server --console-address ":$4" /data
