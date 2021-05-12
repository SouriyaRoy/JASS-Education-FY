import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [AdminHomeComponent, UserComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
  ],
  exports: [
    AdminHomeComponent,
    UserComponent, 
  ]
})
export class AdminPanelModule { }
