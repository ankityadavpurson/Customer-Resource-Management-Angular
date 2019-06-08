import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class BasicService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  private logged = new BehaviorSubject<boolean>(false);
  currentLogged = this.logged.asObservable();
  changeLogged = (value: boolean) => this.logged.next(value);

  tosterOpen = (message: string, action?: string, time?: number) => {
    this.snackBar.open(message, action, { duration: time });
  }

  tosterDismiss = () => {
    this.snackBar.dismiss();
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
