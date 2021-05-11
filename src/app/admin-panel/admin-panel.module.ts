import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [AdminHomeComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    NgbDropdown
  ],
  exports: [
    AdminHomeComponent
  ]
})
export class AdminPanelModule { }
