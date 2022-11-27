# API application (NestJS)

## Links

-   ### API

    -   **local**: http://leprechaun/api
    -   **remote test API server**: https://leprechaun.store/api

-   ### OpenAPI

    -   **local**: http://leprechaun/docs
    -   **remote test API server**: https://leprechaun.store/docs

## Tools

-   `yarn migrations:create` create migration module to `./migrations` folder
-   `yarn migrations:run` run all migrations inside `./migrations` folder

## Docs

-   ### scheduller

    -   **every day at 03:00**:

        -   clear useless sessions
        -   check product `is_new` status
