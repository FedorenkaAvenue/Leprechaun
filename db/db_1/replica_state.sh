#!/bin/bash

psql \
    -U $POSTGRES_USER \
    -d $POSTGRES_DATABASE \
    -c '\dRs' \
    -c 'SELECT * FROM pg_stat_subscription;'
