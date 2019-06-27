import { Component, OnInit } from '@angular/core';

import { BasicService } from './services/basic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private service: BasicService
  ) { }

  ngOnInit() {

    window.addEventListener('online', (e) => {
      this.service.tosterOpen('Back to online', '', 2000, ['online']);
    });

    window.addEventListener('offline', (e) => {
      this.service.tosterOpen('Connection lost! You are offline.', '', 20000, ['offline']);
    });

  }
}
