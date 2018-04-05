import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Log } from 'ng2-logger';

import { User } from '../shared/models/user.model';
import {UserService} from "../shared/services/user.service";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-dashboards',
  templateUrl: 'dashboards.component.html',
  styleUrls: ['dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {
  /** Logger */
  private log = Log.create('DashboardsComponent');

  /** db user */
  public user: User;

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

  constructor(private auth: AuthService,
              private userService: UserService) { }

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    this.template = this.loadingTmpl;
    this.userService.getUser(this.auth.currentUser).subscribe((user) => {
      if (user) {
        this.user = user;
        this.log.d('Loaded user', this.user);
        console.log(this.user === 'admin');
        if (this.user.role === 'admin') {
          console.log('admin');
          this.template = this.dashboardAdmin;
        } else if (this.user.role === 'user') {
          console.log('user');
          this.template = this.dashboardUser;
        } else {
          console.log('client');
          this.template = this.dashboardRestaurant;
        }
      }
    });
  }

}
