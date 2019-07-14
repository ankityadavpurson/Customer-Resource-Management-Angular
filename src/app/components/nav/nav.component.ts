import { Component, OnInit, OnDestroy, AfterContentChecked } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { BasicService } from 'src/app/services/basic.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy, AfterContentChecked {

  constructor(
    private service: BasicService,
    private rest: RestService,
    private router: Router
  ) { }

  logged = false;
  iSubscribe: Subscription;
  home = true;

  ngOnInit() {
    this.iSubscribe = this.service.currentLogged.subscribe(value => {
      this.logged = value;
    });

    this.logged = this.service.storage('session-get', 'token')
      ? true : false;
  }

  openMenu() {
    const x = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
      x.className += ' responsive';
    } else {
      x.className = 'topnav';
    }
  }

  logout() {
    this.rest.post('client/logout', {},
      resp => {
        this.logged = false;
        this.service.changeLogged(this.logged);
        sessionStorage.clear();
        this.router.navigate(['']);
      });
  }

  ngAfterContentChecked(): void {
    this.home = (this.router.url === '/home') ? true : false;
  }

  ngOnDestroy(): void {
    this.iSubscribe.unsubscribe();
  }
}
