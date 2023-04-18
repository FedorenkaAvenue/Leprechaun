# Databases (PostgreSQL)

## Params

- `db_0` - master DB (publisher)
- `db_1` - slave DB (subscriber)

## Tools

- `make dump_pull` - create dump (from `db_1`)
- `make replication_state` - check replica connection data
- `make replication_sync -i` - sync replica DB
