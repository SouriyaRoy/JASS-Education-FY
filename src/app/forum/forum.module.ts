import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumRoutingModule } from './forum-routing.module';
import { FeedComponent } from './feed/feed.component';
import { HomeComponent } from './home/home.component';
import { ShowForumCommentsComponent } from './show-forum-comments/show-forum-comments.component';


@NgModule({
  declarations: [FeedComponent, HomeComponent, ShowForumCommentsComponent],
  imports: [
    CommonModule,
    ForumRoutingModule
  ],
  exports:[
    FeedComponent,
    HomeComponent,
    ShowForumCommentsComponent
  ]
})
export class ForumModule { }
