# Leprechaun💰

## Description

Boilerplate for web store

## Deploy

 * #### local

   - create `.env` file inside root directory based on `.env.dist` file with own config parameters
   - install all *npm* dependencies inside **server**, **client** and **admin** folders (using `npm i` or `yarn` commands)
   - run `make build` to deploy and start all containers
   - add `leprechaun docs.leprechaun adm.leprechaun api.leprechaun` aliases to Your `/etc/hosts` list

 * #### remote test server🌐

   - push changes to **test** branch and check [action](https://github.com/FedorenkaAvenue/Leprechaun/actions) result

## Links

 * local

   * http://leprechaun user client
   * http://adm.leprechaun admin client
   * http://docs.leprechaun *Swagger* docs
   * http://api.leprechaun RestFull API server

 * remote test server

   * https://leprechaun.tech user client
   * https://adm.leprechaun.tech admin client
   * https://docs.leprechaun.tech *Swagger* docs
   * https://api.leprechaun.tech RestFull API server

## Tools

 * container managing

    * `make start` to start all containers (without build)
    * `make stop` to stop all containers
    * `make logs` watch all logs

 * other

    * `make open_image_hosting` open image hosting GUI folder (*linux*)
    * `make migrations` run DB migrations
    * `make manticore_index` index *Manticore* search engine
