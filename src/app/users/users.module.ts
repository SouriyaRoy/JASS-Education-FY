import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
  exports: [
    LoginComponent,
    SignupComponent
  ]
})
export class UsersModule { }
