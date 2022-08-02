

# Plans:
- [x] Angular 11
- [x] `document is not defined` and `window is not defined` - [here](./defined.md)
- [x] [Angular Material2](https://material.angular.io/) **UI components**
- [x] [Primeng](https://www.primefaces.org/primeng/) **UI components**
- [x] modules import depending on the platform (`MockServerBrowserModule`)
- [x] execution of queries to api on the server `TransferHttp`
- [x] work with cookies on the server `UniversalStorage`
- [x] Uses **[ngx-meta](https://github.com/fulls1z3/ngx-meta)** for SEO (*title, meta tags, and Open Graph tags for social sharing*).
- [x] uses ngx-translate to support internationalization (i18n)
- [x] uses ORIGIN_URL - for absolute queries

## How to start
- `yarn` or `npm install`
- `yarn start` or `npm run start` - for client rendering
- `yarn ssr` or `npm run ssr` - for server-side rendering
- `yarn build:universal` or `npm run build:universal` - for assembly in release
- `yarn server` or `npm run server` - to start the server
- `yarn build:prerender` or `npm run build:prerender` - to generate static by `static.paths.ts`
- for watch with ssr - `npm run ssr:watch`
