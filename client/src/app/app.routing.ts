import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  { path: '', loadChildren: () => import('../app/shared/layouts/components/wrapper/wrapper.module').then( module => module.WrapperModule) },
  { path: 'not-found', loadChildren: () => import('../app/not-found/not-found.module').then( (module) => module.NotFoundModule)},
  { path: '**', redirectTo: 'mot-found'}
];
// must use {initialNavigation: 'enabled'}) - for one load page, without reload
export const AppRoutes = RouterModule.forRoot(routes, { initialNavigation: 'enabled' });
