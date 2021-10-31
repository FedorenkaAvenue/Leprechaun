import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WrapperComponent } from "./wrapper.component";

const routes: Routes = [
    {
        path: "",
        component: WrapperComponent,
        children: [
            {
                path: 'products',
                loadChildren: () => import('../../../../pages/products/products.module').then( m => m.ProductsModule)
            },
            {
                path: 'product/:id',
                loadChildren: () => import('../../../../pages/product-page/product-page.module').then(m => m.ProductPageModule)
            },
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)]
})

export class WrapperRoutingModule {

}