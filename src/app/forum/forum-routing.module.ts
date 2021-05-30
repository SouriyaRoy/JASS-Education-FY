import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component'
import { HomeComponent } from './home/home.component'
import { ShowForumCommentsComponent } from './show-forum-comments/show-forum-comments.component';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'feed',
    component:FeedComponent
  },
  {
    path:'show-comments/:id',
    component: ShowForumCommentsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
