import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { UserComponent } from './user/user.component';
import { TicketsComponent } from './tickets/tickets.component';
import { MatTooltipModule } from '@angular/material/tooltip'

@NgModule({
  declarations: [AdminHomeComponent, UserComponent, TicketsComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule
  ],
  exports: [
    AdminHomeComponent,
    UserComponent, 
    TicketsComponent
  ]
})
export class AdminPanelModule { }
