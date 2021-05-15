import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { CookieService } from 'ngx-cookie-service';
import { CookieComponent } from './cookie/cookie.component';
import { AlertService } from './services/alert.service';
import { YoutubeService } from './services/youtube.service';
import { UserAuthService } from './services/user-auth.service';
import { UserserviceService } from './services/userservice.service';

@NgModule({
  declarations: [
    AppComponent,
    CookieComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [CookieService, AlertService, YoutubeService,UserAuthService, UserserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
