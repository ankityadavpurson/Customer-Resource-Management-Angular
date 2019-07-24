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

  /**
   * _LOGGED is instantiated as BehaviorSubject of type boolean
   */
  private readonly _LOGGED = new BehaviorSubject<boolean>(false);

  /**
   * Creates a new Observable with this Subject as the source
   * @return Observable that the Subject casts to
   */
  currentLogged = this._LOGGED.asObservable();

  /**
   * Change the current login state in app
   * @param value Bolean value
   */
  changeLogged = (value: boolean) => this._LOGGED.next(value);

  /**
   * Opens a snackbar with a message and an optional action.
   * @param message The message to show in the snackbar.
   * @param action The label for the snackbar action.
   * @param time Time for the snackbar after which it dismisses.
   */
  tosterOpen = (message: string, action?: string, time?: number, classNames?: string[]) => {
    this.snackBar.open(message, action, { duration: time || 10000, panelClass: classNames });
  }

  /**
   * Dismisses the currently-visible snack bar.
   */
  tosterDismiss = () => {
    this.snackBar.dismiss();
  }

  /**
   * Open snackbar in red color showing server error
   */
  showError = (message: string) => {
    this.tosterOpen(message || 'Server Not Responding, Try Again', 'OK', 5000);
  }

  /**
   * Store value in localStorage or sessionStorage applying JSON.stringify() and JSON.parse()
   * @param typeGetSet 'local-get' | 'local-set' - to set or get in localStorage
   *                   'session-get' | 'session-set' - to set or get in sessionStorage
   * @param key storage[key] = value or value = storage[key]
   * @param value A JavaScript value, usually an object or array, to be stored/retrived.
   */
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

  /**
   * Convert timeStamp given in string | number | Date into string
   * @param timeStamp [string | number | Date] timeformate
   */
  moment = (timeStamp: string | number | Date): string => {
    let date = '';
    const spliter = '-';
    const d = new Date(timeStamp);
    const DATE = d.getDate();
    const MONTH = d.getMonth();
    const YEAR = d.getFullYear();
    date += DATE < 10 ? '0' + DATE + spliter : DATE + spliter;
    date += (MONTH + 1) < 10 ? '0' + (MONTH + 1) + spliter : +(MONTH + 1) + spliter;
    date += YEAR;
    return date;
  }

}
