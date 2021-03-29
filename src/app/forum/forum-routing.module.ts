import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component'
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'feed',
    component:FeedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
