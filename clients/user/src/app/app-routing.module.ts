import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CacheMechanism, LocalizeParser, LocalizeRouterModule, LocalizeRouterSettings, ManualParserLoader } from '@gilsdav/ngx-translate-router';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { environment } from 'environments/environment.global';

export function getLangs(): Array<string> {
    return environment.langs.split(',')
}
const routes: Routes = [

    { path: '', loadChildren: () => import('./shared/layouts/components/wrapper/wrapper.module').then(module => module.WrapperModule) },
    { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then((module) => module.NotFoundModule) },
    { path: '**', redirectTo: 'not-found' }
];


export function createTranslateLoader(translate: TranslateService, location: Location, settings: LocalizeRouterSettings) {
    return new ManualParserLoader(translate, location, settings, getLangs(), 'ROUTES.');
}


// must use {initialNavigation: 'enabled'}) - for one load page, without reload
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { initialNavigation: 'disabled', relativeLinkResolution: 'legacy'}),
        LocalizeRouterModule.forRoot(routes, {
            parser: {
                provide: LocalizeParser,
                useFactory: (createTranslateLoader),
                deps: [TranslateService, Location, LocalizeRouterSettings/*, HttpClient*/]
            },
            cacheMechanism: CacheMechanism.Cookie,
            cookieFormat: '{{value}};{{expires}};path=/',
            initialNavigation: true
        })
    ],
    exports: [RouterModule, LocalizeRouterModule]
})
export class AppRoutingModule {
}
