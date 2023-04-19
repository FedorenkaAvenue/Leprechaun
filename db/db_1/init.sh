#!/bin/bash

set -e
export PGPASSWORD=$MASTER_DB_PASS
TRY_COUNT=0
DONE=false

while ! $DONE && [ $TRY_COUNT -lt 30 ]
do
    echo "Trying to make connection with ready publisher DB..."

    if [[ $(psql -v ON_ERROR_STOP=1 -h $MASTER_DB_HOST -U $POSTGRES_USER -d $POSTGRES_DATABASE -c "SELECT * FROM category") ]]
    then
        echo "Successfuly connected."
        pg_dump -U $POSTGRES_USER -d $POSTGRES_DB -h $MASTER_DB_HOST -s | psql -U $POSTGRES_USER -d $POSTGRES_DATABASE
        psql \
            -v ON_ERROR_STOP=1 \
            -U "$POSTGRES_USER" \
            -d "$POSTGRES_DB" \
            -c "CREATE SUBSCRIPTION allsub CONNECTION 'host=$MASTER_DB_HOST user=$MASTER_DB_USER password=$MASTER_DB_PASS dbname=$MASTER_DB_NAME' PUBLICATION allpub";
        DONE=true
        echo "Done."

        break
    fi

    sleep 2
    TRY_COUNT=`expr $TRY_COUNT + 1`
done
