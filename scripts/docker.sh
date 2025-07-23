#!/bin/bash

set -e

ACTION=$1
NETWORK_NAME="leprechaun-shared"
ROOT_ENV_FILE="$(pwd)/.env"

if [[ "$ACTION" != "start" && "$ACTION" != "stop" && "$ACTION" != "build" && "$ACTION" != "down" ]]; then
  echo "❌ Unknown command: $ACTION"
  exit 1
fi

if [[ "$ACTION" == "build" ]]; then
  if ! docker network inspect "$NETWORK_NAME" >/dev/null 2>&1; then
    docker network create "$NETWORK_NAME"
  fi
fi

find . -maxdepth 3 -type f \( -name "docker-compose.yml" -o -name "docker-compose.yaml" \) | while read compose_file; do
  dir=$(dirname "$compose_file")

  (
    cd "$dir"

    case "$ACTION" in
      start)
        docker compose --env-file "$ROOT_ENV_FILE" start
        ;;
      stop)
        docker compose --env-file "$ROOT_ENV_FILE" stop
        ;;
      build)
        docker compose --env-file "$ROOT_ENV_FILE" up --build -d
        ;;
      down)
        docker compose --env-file "$ROOT_ENV_FILE" down -v
        ;;
    esac
  )
done

echo ""
echo "✅ Done."
