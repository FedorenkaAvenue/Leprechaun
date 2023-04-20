#!/bin/bash

BACKUP_PATH=./backup
DATE=$(date -Iseconds)

mkdir -p $BACKUP_PATH
pg_dumpall -U "$POSTGRES_USER" --data-only -f $BACKUP_PATH/$DATE.sql
echo "Created $DATE.sql dump file." 
