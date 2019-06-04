import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LOGINDATA } from 'src/assets/constant';

@Injectable({
  providedIn: 'root'
})
export class BasicServiceService {

  constructor() { }

  private logged = new BehaviorSubject<boolean>(false);
  currentLogged = this.logged.asObservable();
  changeLogged = (value: boolean) => this.logged.next(value);

  login(userdata) {
    for (const user of LOGINDATA) {
      const { userId, password } = userdata;
      if (user.userId === userId && user.pass === password) {
        return true;
      }
    }
    return false;
  }

  storage = (typeGetSet: 'local-get' | 'local-set' | 'session-get' | 'session-set', key: string, value?: any) => {

    const [type, getSet] = typeGetSet.split('-');

    if (type === 'local') {
      if (getSet === 'set') { localStorage.setItem(key, JSON.stringify(value)); }
      if (getSet === 'get') { return JSON.parse(localStorage.getItem(key)); }
    }

    if (type === 'session') {
      if (getSet === 'set') { sessionStorage.setItem(key, JSON.stringify(value)); }
      if (getSet === 'get') { return JSON.parse(sessionStorage.getItem(key)); }
    }
  }

}

