import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { BasicService } from './basic.service';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private http: HttpClient,
    private service: BasicService
  ) { }

  // private readonly baseUrl: string = 'https://crmnodeapi.herokuapp.com/';
  private readonly baseUrl: string = 'http://192.168.2.5:3000/';
  private iSubscribe: Subscription;
  private token = this.service.storage('session-get', 'token');
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    token: `$tokenBearer ${this.token}`
  });

  private apiGet(apiName): Observable<any> {
    return this.http.get(this.baseUrl + apiName, { headers: this.headers });
  }

  private apiPost(apiName, dataInfo): Observable<any> {
    return this.http.post(this.baseUrl + apiName, dataInfo, { headers: this.headers });
  }

  get(apiName: string, callBack: (arg: any) => void) {
    this.iSubscribe = this.apiGet(apiName).subscribe(
      resp => callBack(resp),
      error => {
        this.service.tosterOpen('Server Not Responding, Try Again', 'OK', 5000);
        console.log(error);
      });
  }

  post(apiName: string, data: any, callBack: (arg: any) => void) {
    this.iSubscribe = this.apiPost(apiName, data).subscribe(
      resp => callBack(resp),
      error => {
        this.service.tosterOpen('Server Not Responding, Try Again', 'OK', 5000);
        console.log(error);
      }
    );
  }

}
