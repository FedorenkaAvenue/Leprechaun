#!/bin/bash

set -e

export PGPASSWORD=$MASTER_DB_PASS

TRY_COUNT=0

while [ $TRY_COUNT -lt 10 ]
do
    echo "Trying to make connection with publisher DB..."

    if [[ $(psql -h $MASTER_DB_HOST -U $POSTGRES_USER -d $MASTER_DB_HOST -c "SELECT * FROM category") ]]
    then
        echo "Successfuly connected."

        pg_dump -U $POSTGRES_USER -d $POSTGRES_DB -h $MASTER_DB_HOST -s | psql -U $POSTGRES_USER -d $POSTGRES_DATABASE

        psql \
            -v ON_ERROR_STOP=1 \
            -U "$POSTGRES_USER" \
            -d "$POSTGRES_DB" \
            -c "CREATE SUBSCRIPTION allsub CONNECTION 'host=$MASTER_DB_HOST user=$MASTER_DB_USER password=$MASTER_DB_PASS dbname=$MASTER_DB_NAME' PUBLICATION allpub";
    fi

    sleep 3

    TRY_COUNT=`expr $TRY_COUNT + 1`
done
