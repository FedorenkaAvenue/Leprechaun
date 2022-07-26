# Leprechaun💰

## Description

Boilerplate for web store

## Deploy

 * #### local

   - create `.env` file inside root directory based on `.env.dist` file with own config parameters
   - install all *npm* dependencies inside **server**, **client**, **admin** and **translations** folders (using `npm i` or `yarn` commands)
   - run `make build` to deploy and start all containers
   - add `leprechaun docs.leprechaun adm.leprechaun api.leprechaun media.leprechaun` aliases to Your `/etc/hosts` list

 * #### remote test server🌐

   - push changes to **test** branch and check [action](https://github.com/FedorenkaAvenue/Leprechaun/actions) result

## Links

 * local

   * http://leprechaun user client
   * http://adm.leprechaun admin client
   * http://docs.leprechaun *Swagger* docs
   * http://api.leprechaun RestFull API server
   * http://media.leprechaun media files server

 * remote test server

   * https://leprechaun.tech user client
   * https://adm.leprechaun.tech admin client
   * https://docs.leprechaun.tech *Swagger* docs
   * https://api.leprechaun.tech RestFull API server
   * https://media.leprechaun.tech media files server

## Docs

  * **Enums**

    * order status
        
      * `INIT`: **1** (корзина)
      * `POSTED`: **2** (подтвержден пользователем)
      * `IN_PROCESS` **3** (подтвержден продавец)
      * `COMPLETED`: **4** (завершен)
      * `CANCELED`: **5** (отменен)

    * product status

      * `AVAILABLE`: **1** (в продаже)
      * `OUT_OF_STOCK`: **2** (закончился)

    * sort type

      * `POPULAR`: **1** (по популярности)
      * `PRICE_UP`: **2** (от дешевых к дорогим)
      * `PRICE_DOWN`: **3** (от дорогих к дешевым)
      * `NEW`: **4** (по новинкам)

    * label types

      * `DISCOUNT`: **discount** (скидка)
      * `NEW`: **new** (новинка)
      * `POPULAR`: **popular** (популярные)

## Tools

 * container managing

    * `make build` build and run containers (dev)
    * `make build_single args="$SERVICE_NAME"` build and run `$SERVICE_NAME` container (dev)
    * `make build_prod` build and run containers (prod)
    * `make build_prod_single args="$SERVICE_NAME"` build and run `$SERVICE_NAME` container (prod)
    * `make start` to start all containers (without build)
    * `make stop` to stop all containers
    * `make logs` watch all logs

 * other

    * `make translation` build translations
    * `make open_image_hosting` open image hosting GUI folder (*linux*)
    * `make migrations` run DB migrations
    * `make manticore_index` index *Manticore* search engine
