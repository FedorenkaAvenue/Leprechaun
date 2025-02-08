# API application (NestJS)

## Tools

-   `yarn migrations:create` create migration module to `./migrations` folder
-   `yarn migrations:run` run all migrations inside `./migrations` folder

## Docs

-   ### scheduller

    -   **every day at 03:00**:

        -   clear useless sessions
        -   check product `is_new` status
