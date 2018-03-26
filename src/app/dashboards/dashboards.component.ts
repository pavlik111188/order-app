import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Log } from 'ng2-logger';

@Component({
  selector: 'app-dashboards',
  templateUrl: 'dashboards.component.html',
  styleUrls: ['dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {
  /** Logger */
  private log = Log.create('DashboardsComponent');

  /** Template ref  */
  public template: TemplateRef<any>;

  /** TemplateRef loading */
  @ViewChild('loadingTmpl') loadingTmpl: TemplateRef<any>;
  /** TemplateRef dashboard user */
  @ViewChild('dashboardUser') dashboardUser: TemplateRef<any>;
  /** TemplateRef dashboard restaurant */
  @ViewChild('dashboardRestaurant') dashboardRestaurant: TemplateRef<any>;
  /** TemplateRef dashboard admin */
  @ViewChild('dashboardAdmin') dashboardAdmin: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    this.template = this.dashboardAdmin;
  }

}
