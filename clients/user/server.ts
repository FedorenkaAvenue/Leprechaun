import 'zone.js/node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import * as compression from 'compression';
import * as cookieparser from 'cookie-parser';
import { exit, nextTick } from 'process';

import * as xhr2 from 'xhr2';
import { environment } from 'environments/environment.global';

//HACK - enables setting cookie header
xhr2.prototype._restrictedHeaders.cookie = false;

// for debug
require('source-map-support').install();

// for tests
const test = process.env['TEST'] === 'true';

// ssr DOM
const domino = require('domino');
const fs = require('fs');
const path = require('path');
// index from browser build!
const template = fs.readFileSync(path.join('.', 'dist', 'index.html')).toString();

// translates 
const locales: Array<string> = environment.langs.split(',');

// for mock global window by domino
const win = domino.createWindow(template);
// mock
global['window'] = win;
// not implemented property and functions
Object.defineProperty(win.document.body.style, 'transform', {
    value: () => {
        return {
            enumerable: true,
            configurable: true,
        };
    },
});
// mock documnet
global['document'] = win.document;
// othres mock
global['CSS'] = null;
// global['XMLHttpRequest'] = require('xmlhttprequest').XMLHttpRequest;
global['Prism'] = null;

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
    const server = express();
    const distFolder = join(process.cwd(), 'dist');
    const indexHtml = existsSync(join(distFolder, 'index.original.html'))
        ? 'index.original.html'
        : 'index';

    // redirects!
    const redirectowww = false;
    const redirectohttps = false;
    const wwwredirecto = true;
    server.use((req, res, next) => {
        // for domain/index.html
        if (req.url === '/index.html') {
            res.redirect(301, 'https://' + req.hostname);
        }

        // check if it is a secure (https) request
        // if not redirect to the equivalent https url
        if (
            redirectohttps &&
            req.headers['x-forwarded-proto'] !== 'https' &&
            req.hostname !== 'localhost'
        ) {
            // special for robots.txt
            if (req.url === '/robots.txt') {
                next();
                return;
            }
            res.redirect(301, 'https://' + req.hostname + req.url);
        }

        // www or not
        if (redirectowww && !req.hostname.startsWith('www.')) {
            res.redirect(301, 'https://www.' + req.hostname + req.url);
        }

        // www or not
        if (wwwredirecto && req.hostname.startsWith('www.')) {
            const host = req.hostname.slice(4, req.hostname.length);
            res.redirect(301, 'https://' + host + req.url);
        }

        // for test
        if (test && req.url === '/test/exit') {
            res.send('exit');
            exit(0);
        }

        next();
    });

    // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
    server.engine(
        'html',
        ngExpressEngine({
            bootstrap: AppServerModule,
        }),
    );

    server.set('view engine', 'html');
    server.set('views', distFolder);

    // cokies
    server.use(cookieparser()); 

    // Serve static files from /browser
    server.get(
        '*.*',
        express.static(distFolder, {
            maxAge: '1y',
        }),
    );

    //  All regular routes not use the Universal engine
     server.get(['/**/cart', '/**/cabinet/**'], (req, res) => {
        res.sendFile(distFolder + '/index.html') 
    });


    // All regular routes use the Universal engine
    server.get('*', (req, res) => {

        const lang = req.path.split('/')[1];
        const isValid = locales.includes(lang);

        const defaultLang = locales[0];
        const browserLang = req.acceptsLanguages(...locales);
        const cookieLang = req.cookies.LOCALIZE_DEFAULT_LANGUAGE; // This is the default name of cookie
      
        const definedLang = cookieLang || browserLang || defaultLang;

        if(!isValid) {
            res.redirect(301, `/${definedLang}${req.path}`);
       } else {

        res.render(indexHtml, {
            req,
            providers: [
                { provide: APP_BASE_HREF, useValue: req.baseUrl },
                { provide: 'REQUEST', useValue: req },
                { provide: 'RESPONSE', useValue: res },
            ],
        });

       }
    });

    return server;
}

function run() {
    const port = process.env.PORT || 4000;

    // Start up the Node server
    const server = app();
    // gzip
    server.use(compression());

    server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
    run();
}

export * from './src/main.server';
