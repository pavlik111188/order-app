import { Component, OnInit } from '@angular/core';

import {User} from "../../shared/models/user.model";
import {AuthService} from "../../shared/services/auth.service";
import {ToastComponent} from "../../shared/toats/toast.component";
import {UserService} from "../../shared/services/user.service";
import {EventService} from "../../shared/services/event.service";
import { Event } from '../../shared/models/event.model';


@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.scss']
})
export class DashboardUserComponent implements OnInit {

  user: User;
  events: Event[] = [];
  isLoading = true;

  constructor(private auth: AuthService,
              private eventService: EventService,
              public toast: ToastComponent,
              private userService: UserService) { }

  ngOnInit() {
    this.getUser();
    this.getEvents();
  }

  getUser() {
    this.userService.getUser(this.auth.currentUser).subscribe(
        data => this.user = data,
        error => console.log(error),
        () => this.isLoading = false
    );
  }

  getEvents() {
    this.eventService.getEvents().subscribe(
        data => this.events = data,
        error => console.log(error),
        () => this.isLoading = false
    );
  }

  save(user: User) {
    this.userService.editUser(user).subscribe(
        res => this.toast.setMessage('account settings saved!', 'success'),
        error => console.log(error)
    );
  }

}
