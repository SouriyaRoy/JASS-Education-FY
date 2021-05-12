import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCredentialsRoutingModule } from './admin-credentials-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [
    ListComponent,
    EditComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    AdminCredentialsRoutingModule
  ],
  exports: [
    ListComponent,
    EditComponent,
    ViewComponent
  ]
})
export class AdminCredentialsModule { }
