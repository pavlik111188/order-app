import {Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Log } from 'ng2-logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  /** Logger */
  private log = Log.create('AppComponent');

  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use(translate.getBrowserLang());
  }

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
  }
}
