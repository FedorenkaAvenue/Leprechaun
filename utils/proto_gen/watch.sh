#!/bin/bash

make generate

while inotifywait -r -e modify ./proto; do
    echo "Trying to compile proto files..."
    make generate
done
