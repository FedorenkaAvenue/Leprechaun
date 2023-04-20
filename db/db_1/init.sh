#!/bin/bash

set -e
export PGPASSWORD=$MASTER_DB_PASS

tryCount=0
isDone=false

while ! $isDone && [ $tryCount -lt 30 ]
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
        isDone=true
        echo "Done."

        break
    fi

    sleep 2
    tryCount=`expr $tryCount + 1`
done
