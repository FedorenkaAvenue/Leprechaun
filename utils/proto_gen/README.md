# Proto gen

Generate types and utils from `proto` files.

## Docs

Proto files are in root project folder `proto`. You should only edit them.  
Don't edit `proto` files in `./proto` folder. It is docker volume for `/proto` folder.  
Types and utils generate into `./gen` folder.  
You can also generate types and utils withou **docker** via run `make generate`.
