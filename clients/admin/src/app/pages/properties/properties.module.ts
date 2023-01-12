import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertiesRoutingModule } from './properties-routing.module';
import { PropertiesGroupsComponent } from './components/properties-groups/properties-groups.component';
import { ProperiesService } from './services/properies.service';
import { PropertiesApiService } from 'src/app/shared/services/properties/properties-api.service';
import { PropertyPreviewCardComponent } from './components/property-preview-card/property-preview-card.component';
import { CreatePropertiesGroupComponent } from './components/create-properties-group/create-properties-group.component';
import { PropertiesGroupFormComponent } from './components/properties-group-form/properties-group-form.component';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { TranslationFormModule } from 'src/app/shared/controls/translation-form/translation-form.module';
import { ValueDefaultTranslationModule } from 'src/app/shared/pipes/value-default-translation/value-default-translation.module';
import { PropertyGroupPreviewCardComponent } from './components/property-group-preview-card/property-group-preview-card.component';
import { CreatePropertyComponent } from './components/create-property/create-property.component';
import { PropertyGroupComponent } from './components/property-group/property-group.component';
import { PropertyFormComponent } from './components/property-form/property-form.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    PropertiesGroupsComponent,
    PropertyPreviewCardComponent,
    CreatePropertiesGroupComponent,
    PropertiesGroupFormComponent,
    PropertyGroupPreviewCardComponent,
    CreatePropertyComponent,
    PropertyGroupComponent,
    PropertyFormComponent
  ],
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    MatInputModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    TranslationFormModule,
    ValueDefaultTranslationModule,
    MatSelectModule
  ],
  providers: [
    ProperiesService,
    PropertiesApiService

  ]
})
export class PropertiesModule { }
