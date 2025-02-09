#!/bin/bash

psql \
    -U $POSTGRES_USER \
    -d $POSTGRES_DATABASE \
    -c '\dRp' \
    -c 'SELECT client_addr, state, application_name FROM pg_stat_replication';
