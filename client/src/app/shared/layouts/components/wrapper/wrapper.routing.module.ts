import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WrapperComponent } from "./wrapper.component";

const routes: Routes = [
    {
        path: "",
        component: WrapperComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('../../../../pages/home/home.module').then(m => m.HomeModule)
            },
            {
                path: 'products',
                loadChildren: () => import('../../../../pages/products/products.module').then( m => m.ProductsModule)
            },
            {
                path: 'product/:id',
                loadChildren: () => import('../../../../pages/product-page/product-page.module').then(m => m.ProductPageModule)
            },
            {
                path: 'cart',
                loadChildren: () => import('../../../../pages/cart-page/cart-page.module').then(m => m.CartPageModule)
            }
            ,
            {
                path: 'favorites',
                loadChildren: () => import('../../../../pages/favorites-page/favorites-page.module').then(m => m.FavoritesPageModule)
            }
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)]
})

export class WrapperRoutingModule {

}
