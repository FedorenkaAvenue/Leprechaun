# Leprechaun💰

## Description

Boilerplate for web store

## Deploy

-   #### local

    -   create `.env` file inside root directory based on `.env.dist` file with own config parameters
    -   install all _npm_ dependencies inside **server**, **client**, **admin** and **translations** folders (using `npm i` or `yarn` commands)
    -   run `make build` to deploy and start all containers
    -   add `leprechaun.loc api.leprechaun.loc docs.leprechaun.loc media.leprechaun.loc adm.leprechaun.loc ssr.leprechaun.loc` aliases to Your `/etc/hosts` list

<!-- -   #### remote test server🌐

    -   push changes to **test** branch and check [action](https://github.com/FedorenkaAvenue/Leprechaun/actions) result -->

## Links

-   local

    -   http://leprechaun.loc user client

    -   http://adm.leprechaun.loc admin client

    -   http://docs.leprechaun.loc/private _OpenAPI_ private (admin) docs
    -   http://docs.leprechaun.loc/public _OpenAPI_ public (customer) docs

    -   http://api.leprechaun.loc/private RestFull private (admin) API
    -   http://api.leprechaun.loc RestFull public (customer) API
    -   http://api.leprechaun.loc/socket.io/ websocket public (customer) API

    -   http://media.leprechaun.loc media files server

<!-- -   remote test server

    -   https://leprechaun.space user client
    -   https://adm.leprechaun.space admin client
    -   https://docs.leprechaun.space _Swagger_ docs
    -   https://api.leprechaun.space RestFull API server
    -   https://media.leprechaun.space media files server -->

## Docs

-   **Enums**

    -   user type

        -   `CUSTOMER`: **1** (client user)
        -   `SUPPORT`: **2** (admin support)
        -   `ADMIN` **3**
        -   `ROOT` **4**

    -   order status

        -   `INIT`: **1** (cart)
        -   `POSTED`: **2** (posted cart)
        -   `IN_PROCESS` **3** (cart is accepted by admin)
        -   `COMPLETED`: **4**
        -   `CANCELED`: **5**

    -   product status

        -   `AVAILABLE`: **1**
        -   `OUT_OF_STOCK`: **2**

    -   product list sort

        -   `POPULAR`: **1**
        -   `PRICE_UP`: **2**
        -   `PRICE_DOWN`: **3**
        -   `NEW`: **4**

    -   label types

        -   `DISCOUNT`: **discount**
        -   `NEW`: **new**
        -   `POPULAR`: **popular**

    -   dashboard types

        -   `HISTORY` user product history

## Tools

-   container managing

    -   `make build` build and run containers (dev)
    -   `make build_single args="$SERVICE_NAME"` build and run `$SERVICE_NAME` container (dev)
    -   `make build_prod` build and run containers (prod)
    -   `make build_prod_single args="$SERVICE_NAME"` build and run `$SERVICE_NAME` container (prod)

-   other

    -   `make translation` move translations
    -   `make image_hosting` open image hosting GUI folder (_linux_)
