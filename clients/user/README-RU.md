
# Планы:

- [x] Angular 11
- [x] `document is not defined` и `window is not defined` - [тут](./defined.md)
- [x] [Angular Material2](https://material.angular.io/) **UI компоненты**
- [x] [Primeng](https://www.primefaces.org/primeng/) **UI компоненты**
- [x] импорт модулей в зависимости от платформы (`MockServerBrowserModule`)
- [x] выполнение запросов к api на сервере `TransferHttp`
- [x] работа с Cookies на сервере `UniversalStorage`
- [x] Uses **[ngx-meta](https://github.com/fulls1z3/ngx-meta)** для SEO (_title, meta tags, and Open Graph tags for social sharing_).
- [x] используется ngx-translate для поддержки интернационализации (i18n)
- [x] используется ORIGIN_URL - для абсолютных запросов

## Как запустить

- `yarn` или `npm install`
- `yarn start` или `npm run start` - для клиенского рендеринга
- `yarn ssr` или `npm run ssr` - для серверного рендеринга
- `yarn build:universal` или `npm run build:universal` - для сборки в релиз
- `yarn server` или `npm run server` - для запуска сервера
- `yarn build:prerender` или `npm run build:prerender` - для генерации статики по `static.paths.ts`
- для запуска отслеживания изменения кода при ssr запустите `npm run ssr:watch`
