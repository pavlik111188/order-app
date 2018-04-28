import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { Log } from 'ng2-logger';

import { Event } from '../../shared/models/event.model';
import { User } from '../../shared/models/user.model';
import {UserService} from "../../shared/services/user.service";
import {AuthService} from "../../shared/services/auth.service";
import {ToastComponent} from "../../shared/toats/toast.component";
import {EventService} from "../../shared/services/event.service";

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {
  /** Logger */
  private log = Log.create('DashboardAdminComponent');

  /** Users */
  users: User[] = [];

  /** Events */
  events: Event[] = [];

  isLoading = true;

  /** User modal form */
  public userForm: FormGroup;
  /** Event modal form  */
  public eventForm: FormGroup;

  first_name = new FormControl('', Validators.required);
  last_name = new FormControl('', Validators.required);
  email = new FormControl('', Validators.email);
  role = new FormControl('', Validators.email);
  title = new FormControl('', Validators.required);
  description = new FormControl('', Validators.required);
  date_start = new FormControl('', Validators.required);
  date_end = new FormControl('', Validators.required);

  /** Edit user modal */
  @ViewChild('editUserModal') public editUserModal;
  /** Edit event modal */
  @ViewChild('editEventModal') public editEventModal;

  constructor(public auth: AuthService,
              private eventService: EventService,
              public toast: ToastComponent,
              private userService: UserService,
              private formBuilder: FormBuilder,
              translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use(translate.getBrowserLang());
  }

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    this.getUsers();
    this.userForm = this.formBuilder.group({
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      role: this.role
    });
    this.getEvents();
    this.eventForm = this.formBuilder.group({
      title: this.title,
      description: this.description,
      date_start: this.date_start,
      date_end: this.date_end
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe(
        data => this.users = data,
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

  /**
   * Open edit event modal
   * @param  {Event} event Event
   */
  editEvent(event: Event) {
    this.editEventModal.show();
  }

  /**
   * Open edit user modal
   * @param  {User} user User
   */
  editUser(user: User) {
    this.editUserModal.show();
  }

  /**
   * Update user and hide modal
   */
  updateUser() {

  }

  /**
   * Delete user
   */
  deleteUser(user: User) {
    if (window.confirm('Are you sure you want to delete ' + user.email + '?')) {
      this.userService.deleteUser(user).subscribe(
          data => this.toast.setMessage('user deleted successfully.', 'success'),
          error => console.log(error),
          () => this.getUsers()
      );
    }
  }


}
