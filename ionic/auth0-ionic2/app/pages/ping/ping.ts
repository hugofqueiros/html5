import {Page} from 'ionic-framework/ionic';
import {Http} from 'angular2/http';
import {AuthHttp} from 'angular2-jwt';
import {AuthService} from '../../services/auth/auth';
const map = require('rxjs/add/operator/map');

@Page({
  templateUrl: 'build/pages/ping/ping.html',
})
export class PingPage {
  message: string;
  error: string;
  
  constructor(private http: Http, private authHttp: AuthHttp, private auth: AuthService) {}
  
  ping() {
    // Change the endpoint up for
    // one that points to your own server.
    this.http.get('http://example.com/ping')
      .map(res => res.json())
      .subscribe(
        data => this.message = data,
        err => this.error = err
      );
  }
  
  securedPing() {
    // Here we use authHttp to make an authenticated
    // request to the server. Change the endpoint up for
    // one that points to your own server.
    this.authHttp.get('http://example.com/secured/ping')
      .map(res => res.json())
      .subscribe(
        data => this.message = data,
        err => this.error = err
      );
  }
  
}
