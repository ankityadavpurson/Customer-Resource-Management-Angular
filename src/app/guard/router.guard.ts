import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { BasicService } from '../services/basic.service';

@Injectable({
  providedIn: 'root'
})
export class RouterGuard implements CanActivate {

  constructor(
    private service: BasicService,
    private router: Router
  ) { }

  logged = false;

  canActivate(): boolean {
    this.logged = this.service.storage('session-get', 'token')
      ? true : false;

    if (this.logged) { return this.logged; }

    this.router.navigate(['']);
    this.service.changeLogged(false);
    return this.logged;
  }

}
