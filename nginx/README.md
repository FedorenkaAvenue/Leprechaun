# Web server

## Params

 * local

    * **port (container)**: `80`
    * **default admin user**: `root`
    * **default admin pass**: `barabaka35`

 * remote test server

    * **port (container)**: `84`
    * **default admin user**: `root`
    * **default admin pass**: `barabaka35`

## Hosting tree

 * **/var/www/img/category/** `category image folder`
 * **/var/www/img/product/** `product image folder`

## Tools

 * `make img_pull` download image hosting folder
 * `make generate_user user=USER pass=PASS` to generate new admin user with pass

## Docs

 * **resize images resolution**: `400`, `1024`, `1920`
