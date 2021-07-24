import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WrapperComponent } from "./wrapper.component";

const routes: Routes = [
    {
        path: "",
        component: WrapperComponent
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)]
})

export class WrapperRoutingModule {

}