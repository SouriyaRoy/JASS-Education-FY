///<reference path="../../../node_modules/@types/gapi/index.d.ts" />
///<reference path="../../../node_modules/@types/gapi.auth2/index.d.ts" />
import {Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import GoogleUser = gapi.auth2.GoogleUser;
import GoogleAuth = gapi.auth2.GoogleAuth;
import BasicProfile = gapi.auth2.BasicProfile;
import {BehaviorSubject} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';

@Injectable()
export class YoutubeService {

  private auth: GoogleAuth = null;
  private user$ = new BehaviorSubject<GoogleUser>(null);
  public isSignedIn$ = new BehaviorSubject<any>(false);
  public isAuthInit$ = new BehaviorSubject<any>(false);
  public profile$: BehaviorSubject<BasicProfile>;
  private accessToken: string | null = null;

  constructor(private httpClient: HttpClient, private zone: NgZone) {

    gapi.load('auth2', () => {
      this.zone.run(() => {
        this.initAuth();
      });
    });
    this.profile$ = this.user$.pipe(map(user => user && user.getBasicProfile()
      ? user.getBasicProfile() : null)) as BehaviorSubject<BasicProfile>;
    this.user$.subscribe((user) => {
      if (user) {
        this.accessToken = user.getAuthResponse().access_token;
        console.warn(this.accessToken)
      }
    });
  }

  //TODO: Youtube Channel Auth
  initAuth() {
    const params = {
        clientId: '960646111567-v71qr59fgnffp7bfid7thbgvljk917jo.apps.googleusercontent.com',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
        scope: [
          'https://www.googleapis.com/auth/youtube',
          'https://www.googleapis.com/auth/youtube.upload'
        ].join(' ')
      };
    // {client_id:'960646111567-v71qr59fgnffp7bfid7thbgvljk917jo.apps.googleusercontent.com',
    // project_id:"ivory-choir-312015",
    // auth_uri:"https://accounts.google.com/o/oauth2/auth",
    // token_uri:"https://oauth2.googleapis.com/token",
    // auth_provider_x509_cert_url:"https://www.googleapis.com/oauth2/v1/certs",
    // client_secret:"7bIJtJvvs4pDI75KorIeYamG",
    // redirect_uris:["http://localhost:4200/"],
    // javascript_origins:["http://localhost:4200"]}
    
    const auth = gapi.auth2.init(params);
    auth.then(() => this.zone.run(() => {
      this.auth = auth;
      this.isAuthInit$.next(true);
    })).catch((error) => {
      console.log(error, 'auth failed');
    });

    auth.isSignedIn.listen((value) => this.zone.run(() => {
      this.isSignedIn$.next(value);
      if (!value) {
        this.user$.next(null);
      }
    }));
    auth.currentUser.listen((user) => this.zone.run(() => {
      this.user$.next(user);
    }));
    if (auth.isSignedIn.get() === true) {
      auth.signIn();
    }
    this.zone.run(() => {
      this.user$.next(auth.currentUser.get());
    });
  }

  public signIn() {
    this.auth.signIn({prompt: 'select_account'});
  }

  uploadVideo(video: any,
              input: {
                title: string, description: string,
                privacyStatus: string,
              }) {
    if (!this.accessToken) {
      throw  new Error('authentication is required');
    }
    const data = {
      snippet: {
        title: input.title,
        description: input.description,
        categoryId: 22
      },
      status: {
        privacyStatus: input.privacyStatus,
        embeddable: true
      }
    };
    
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.accessToken)
      .set('Content-Type', 'application/json; charset=UTF-8')
      .set('X-Upload-Content-Length', video.size + '')
      .set('X-Upload-Content-Type', 'video/*')
      .set('Access-Control-Allow-Origin','*')
      .set('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept')
      .set('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');

    const url = 'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status,contentDetails';
    console.warn(data)
    return this.httpClient.post(url, data.toString(), {headers, observe: 'response', responseType: 'text'})
      .pipe(switchMap(newData => {
        const newRequest = new HttpRequest('PUT', newData.headers.get('location'), video, {reportProgress: true});
        return this.httpClient.request(newRequest);
      }));
  }

  public signOut() {
    this.auth.signOut();
  }

}