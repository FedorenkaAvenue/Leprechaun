# Leprechaun💰

## Description

Boilerplate for web store

## Deploy(local)

 * #### local

   - Run `make build` to deploy and start all containers

 * #### remote test server🌐

   - push changes to **test** branch and check [action](https://github.com/FedorenkaAvenue/Leprechaun/actions) result

## Links

 * http://localhost user client
 * http://localhost:81 admin client
 * http://localhost/docs *Swagger* docs
 * http://localhost/api RestFull API server

## Tools

 * container managing

    * `make start` to start all containers (without build)
    * `make stop` to stop all containers
    * `make logs` watch all logs

 * other

    * `make open_image_hosting` open image hosting GUI folder (*linux*)
    * `make migrations` run DB migrations
    * `make manticore_index` index *Manticore* search engine
