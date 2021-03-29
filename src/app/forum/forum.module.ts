import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForumRoutingModule } from './forum-routing.module';
import { FeedComponent } from './feed/feed.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [FeedComponent, HomeComponent],
  imports: [
    CommonModule,
    ForumRoutingModule
  ],
  exports:[
    FeedComponent,
    HomeComponent
  ]
})
export class ForumModule { }
