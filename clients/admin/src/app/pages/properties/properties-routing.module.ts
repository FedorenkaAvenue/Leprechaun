import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePropertiesGroupComponent } from './components/create-properties-group/create-properties-group.component';
import { CreatePropertyComponent } from './components/create-property/create-property.component';
import { PropertiesGroupsComponent } from './components/properties-groups/properties-groups.component';

const routes: Routes = [
  {
    path: '',
    component: PropertiesGroupsComponent,
  },
  {
    path: 'properties-group',
    component: CreatePropertiesGroupComponent,
  },
  {
    path: 'property',
    component: CreatePropertyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PropertiesRoutingModule {}
