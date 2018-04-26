import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { Log } from 'ng2-logger';

import { Event } from '../../shared/models/event.model';
import { User } from '../../shared/models/user.model';
import {UserService} from "../../shared/services/user.service";
import {AuthService} from "../../shared/services/auth.service";
import {ToastComponent} from "../../shared/toats/toast.component";

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

  isLoading = true;

  events: Event[];

  /** User modal form */
  public userForm: FormGroup;
  /** Event modal form  */
  public eventForm: FormGroup;

  /** Edit user modal */
  @ViewChild('editUserModal') public editUserModal;
  /** Edit event modal */
  @ViewChild('editEventModal') public editEventModal;

  constructor(public auth: AuthService,
              public toast: ToastComponent,
              private userService: UserService,
              private formBuilder: FormBuilder,
              translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use(translate.getBrowserLang());

    this.userForm = this.formBuilder.group({
      city: ['', Validators.required],
      email: ['', Validators.email],
      eventCounter: ['', Validators.required],
      eventsLeft: ['', Validators.required],
      isValidated: ['', Validators.required],
      lastname: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      role: ['', Validators.required],
      street: ['', Validators.required],
      subscription: ['', Validators.required],
      uid: ['', Validators.required],
      zip: ['', Validators.required]
    });
    this.eventForm = this.formBuilder.group({
      date: ['', Validators.required],
      description: ['', Validators.required],
      id: ['', Validators.required],
      location: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', Validators.required],
      photographerUid: ['', Validators.required],
      public: [false, Validators.required],
      ratings: [0, Validators.required]
    });
  }

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
        data => this.users = data,
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
