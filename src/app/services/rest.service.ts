import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BasicService } from './basic.service';

import { IResponse } from '../models/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private http: HttpClient,
    private service: BasicService
  ) { }

  private readonly _BASE_URL: string = 'https://crmnodeapi.herokuapp.com/'; // Staging base url
  // private readonly _BASE_URL: string = 'http://localhost:3000/'; // Localhost base url

  // Both get and post request are checking internet status before return
  // HTTP post an observable that is notified when request is finished
  private _getRequest(apiPath: string): Observable<IResponse> {
    return this.http.get<IResponse>(this._BASE_URL + apiPath, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: `$tokenBearer ${this.service.storage('session-get', 'token')}`,
        dbid: `${this.service.storage('session-get', 'dbid')}`
      })
    });
  }

  // HTTP post an observable that is notified when request is finished
  private _postRequest(apiPath: string, dataInfo: any): Observable<IResponse> {
    return this.http.post<IResponse>(this._BASE_URL + apiPath, dataInfo, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        token: `$tokenBearer ${this.service.storage('session-get', 'token')}`,
        dbid: `${this.service.storage('session-get', 'dbid')}`
      })
    });
  }

  /**
   * HTTP get method is subscribed to Observable http get as callback() returning response as IResponse
   * @param apiPath api name or url or api path or event name @example 'inventory/item', 'inventory/categories'
   * @param callBack function return response as the request is completed
   */
  get(apiPath: string, callBack: (response: IResponse) => void): void {
    window.navigator.onLine
      ? this._getRequest(apiPath).subscribe(
        response => callBack(response),
        error => {
          this.service.showError(error.error.message);
          console.log(error);
        })
      : this.service.tosterOpen('Check your Connection.', 'ok', 2000, ['offline']);
  }

  /**
   * HTTP post method is subscribed to Observable http post as callback() returning response as IResponse
   * @param apiPath api name or url or api path or event name @example 'user/login', 'inventory/update'
   * @param data json object that has to be send to request as body @example '{"userId":"tester12", "password":"123456"}'
   * @param callBack function return response as the request is completed
   */
  post(apiPath: string, data: any, callBack: (response: IResponse) => void): void {
    window.navigator.onLine
      ? this._postRequest(apiPath, data).subscribe(
        response => callBack(response),
        error => {
          this.service.showError(error.error.message);
          console.log(error);
        })
      : this.service.tosterOpen('Check your Connection.', 'ok', 2000, ['offline']);
  }

  /**
   * HTTP getAsync method is async function subscribed to Observable http get returns Promise<IResponse>
   * @param apiPath api name or url or api path or event name @example 'inventory/item', 'inventory/categories'
   * @param callBack function return response as the request is completed
   */
  getAsync(apiPath: string): Promise<IResponse> {
    return new Promise<IResponse>(
      (resolve, reject) => {
        this._getRequest(apiPath).subscribe(
          response => resolve(response),
          error => reject(error)
        );
      });
  }

  /**
   * HTTP postAsync method is async function subscribed to Observable http post returns Promise<IResponse>
   * @param apiPath api name or url or api path or event name @example 'user/login', 'inventory/update'
   * @param data json object that has to be send to request as body @example '{"userId":"tester12", "password":"123456"}'
   * @param callBack function return response as the request is completed
   */
  postAsync(apiPath: string, data: any): Promise<IResponse> {
    return new Promise<IResponse>(
      (resolve, reject) => {
        this._postRequest(apiPath, data).subscribe(
          response => resolve(response),
          error => reject(error)
        );
      });
  }
}
