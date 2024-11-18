# Leprechaun💰

## Description

Boilerplate for web store

## Deploy

-   #### local

    -   create `.env` file inside root directory based on `.env.dist` file with own config parameters
    -   install all _npm_ dependencies inside **server**, **client**, **admin** and **translations** folders (using `npm i` or `yarn` commands)
    -   run `make build` to deploy and start all containers
    -   add `leprechaun.loc api.leprechaun.loc docs.leprechaun.loc media.leprechaun.loc adm.leprechaun.loc ssr.leprechaun.loc` aliases to Your `/etc/hosts` list

-   #### remote test server🌐

    -   push changes to **test** branch and check [action](https://github.com/FedorenkaAvenue/Leprechaun/actions) result

## Links

-   local

    -   http://leprechaun.loc user client
    -   http://adm.leprechaun.loc admin client
    -   http://docs.leprechaun.loc _Swagger_ docs
    -   http://api.leprechaun.loc RestFull API server
    -   http://media.leprechaun.loc media files server

-   remote test server

    -   https://leprechaun.space user client
    -   https://adm.leprechaun.space admin client
    -   https://docs.leprechaun.space _Swagger_ docs
    -   https://api.leprechaun.space RestFull API server
    -   https://media.leprechaun.space media files server

## Docs

-   **Enums**

    -   order status

        -   `INIT`: **1** (корзина)
        -   `POSTED`: **2** (подтвержден пользователем)
        -   `IN_PROCESS` **3** (подтвержден продавец)
        -   `COMPLETED`: **4** (завершен)
        -   `CANCELED`: **5** (отменен)

    -   product status

        -   `AVAILABLE`: **1** (в продаже)
        -   `OUT_OF_STOCK`: **2** (закончился)

    -   catalogue sort type

        -   `POPULAR`: **1** (по популярности)
        -   `PRICE_UP`: **2** (от дешевых к дорогим)
        -   `PRICE_DOWN`: **3** (от дорогих к дешевым)
        -   `NEW`: **4** (по новинкам)

    -   wishlist sort type

        -   `LASTEST`: **1**, (последние добавленные)
        -   `PRICE_UP`: **2** (от дешевых к дорогим)
        -   `PRICE_DOWN`: **3** (от дорогих к дешевым)

    -   label types

        -   `DISCOUNT`: **discount** (скидка)
        -   `NEW`: **new** (новинка)
        -   `POPULAR`: **popular** (популярные)

    -   filter types

        -   `RANGE`: **range**
        -   `LIST`: **list**

    -   dashboard types

        -   `HISTORY` user product history

## Tools

-   container managing

    -   `make build` build and run containers (dev)
    -   `make build_single args="$SERVICE_NAME"` build and run `$SERVICE_NAME` container (dev)
    -   `make build_prod` build and run containers (prod)
    -   `make build_prod_single args="$SERVICE_NAME"` build and run `$SERVICE_NAME` container (prod)

-   other

    -   `make translation` build translations
    -   `make image_hosting` open image hosting GUI folder (_linux_)
