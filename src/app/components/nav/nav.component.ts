import { Component, OnInit, AfterContentChecked, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { BasicServiceService } from '../../services/basic-service.service'; 

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, AfterContentChecked, OnDestroy  {

  constructor(
    private service: BasicServiceService,
    private router: Router
  ) { }

  logged = false;
  iSubscribe: Subscription;

  ngOnInit() {
    this.iSubscribe = this.service.currentLogged.subscribe(value => {
      this.logged = value;  
    });

    this.logged  =  this.service.storage('session-get', 'token')
        ? true : false;
    
  }  

  logout() {
    this.logged = false;
    sessionStorage.clear();
    this.service.changeLogged(this.logged);
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this.iSubscribe.unsubscribe();
  }

}
