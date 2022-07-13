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
 * **/var/www/admin** `admin client folder` (prod only)

## Tools

 * `make img_pull` download image hosting folder
 * `make generate_user user=USER pass=PASS` to generate new admin user with pass

## Docs

 * **resize images resolution**: `400`, `1024`, `1920`

## Guides

 * [https://github.com/FiloSottile/mkcert]() generate ssl certificates for *localhost*
