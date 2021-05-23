import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CoordinatorRoutingModule } from './coordinator-routing.module';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    ListComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    CoordinatorRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    ListComponent,
    EditComponent
  ]
})
export class CoordinatorModule { }
