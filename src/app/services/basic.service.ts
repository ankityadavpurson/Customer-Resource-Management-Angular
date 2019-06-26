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

  tosterOpen = (message: string, action?: string, time?: number, classNames?: string[]) => {
    this.snackBar.open(message, action, { duration: time || 2000, panelClass: classNames });
  }

  tosterDismiss = () => {
    this.snackBar.dismiss();
  }

  showError = () => {
    this.tosterOpen('Server Not Responding, Try Again', 'OK', 5000);
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

  moment = (timeStamp: string | number | Date) => {
    let date = '';
    const spliter = '-';
    const d = new Date(timeStamp);
    date += d.getDate() < 10 ? '0' + d.getDate() + spliter : d.getDate() + spliter;
    date += (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) + spliter : +(d.getMonth() + 1) + spliter;
    date += d.getFullYear();
    return date;
  }

}
