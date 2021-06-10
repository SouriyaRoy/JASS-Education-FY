import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';
import { ChooseComponent } from './choose/choose.component';
import { CreateProfileComponent } from './create-profile/create-profile.component'


@NgModule({
  declarations: [LoginComponent, SignupComponent, ChooseComponent, CreateProfileComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  exports: [
    LoginComponent,
    SignupComponent,
    ChooseComponent
  ]
})
export class UsersModule { }
