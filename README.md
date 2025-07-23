# Leprechaun💰

## Description

Boilerplate for web store

## Links

-   local

    -   http://leprechaun.loc user client
    -   http://adm.leprechaun.loc admin client
    -   http://docs.leprechaun.loc/private _OpenAPI_ docs
    -   http://api.leprechaun.loc RestFull API
    -   http://api.leprechaun.loc/socket.io/ websocket public (customer) API
    -   http://localhost:1080 _Mailcatcher_
    -   http://localhost:9010 _MinIO_ (S3) **category** UI admin panel
    -   http://localhost:9014 _MinIO_ (S3) **product** UI admin panel
    -   http://localhost:15672 events UI panel

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

## Deploy

### local

-   run `git submodule update --init --recursive` to install all submodules
-   run `chmod +x ./scripts/*`
-   create `.env` file inside root directory based on `.env.dist` file with own config parameters
-   install all _npm_ dependencies inside all apps, utils and services folders (using `npm i` or `yarn` commands)
-   run `sh docker.sh build` to deploy and start all containers
-   add `leprechaun.loc api.leprechaun.loc docs.leprechaun.loc adm.leprechaun.loc` aliases to Your `/etc/hosts` list

<!-- -   #### remote test server🌐

    -   push changes to **test** branch and check [action](https://github.com/FedorenkaAvenue/Leprechaun/actions) result -->

## Tools

### dev

-   `make build` build and run containers
-   `make start` start all containers
-   `make stop` stop all containers
-   `make down` remove all containers
-   `make translation` move translations
-   `make protos` move generated `.proto` files
