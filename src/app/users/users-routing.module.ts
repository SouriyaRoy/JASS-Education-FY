import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseComponent } from './choose/choose.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import {LoginComponent} from './login/login.component'
import {SignupComponent} from './signup/signup.component'

const routes: Routes = [
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'signup',
    component : SignupComponent
  },
  {
    path:'choose',
    component:ChooseComponent
  },
  {
    path:'create-profile',
    component:CreateProfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
