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
    this.getEvents();
    // Init forms
    this.buildEventForm();
    this.buildUserForm();
  }

  buildEventForm(): void {
    this.eventForm = this.formBuilder.group({
      'title' : [null, [
        Validators.required,
        Validators.minLength(6)
      ]
      ],
      'description' : [null, [
        Validators.required,
        Validators.minLength(6)
      ]
      ],
      'date_start' : [null, [
        Validators.required
      ]
      ],
      'date_end' : [null, [
        Validators.required
      ]
      ]
    });

    this.eventForm.valueChanges
        .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.eventForm) { return; }
    const form = this.eventForm;

    for (const field in this.eventFormErrors) {
      // clear previous error message (if any)
      this.eventFormErrors[field] = [];
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.eventValidationMessages[field];
        for (const key in control.errors) {
          this.eventFormErrors[field].push(messages[key]);
        }
      }
    }
  }

  eventFormErrors = {
    'title': [],
    'description': [],
    'date_start': [],
    'date_end': []
  };

  eventValidationMessages = {
    'title': {
      'required': 'TEXTS.REQ_TITLE',
      'minlength': 'TEXTS.REQ_MINLENGTH_TITLE'
    },
    'description': {
      'required': 'TEXTS.REQ_DESCRIPTION',
      'minlength': 'TEXTS.REQ_MINLENGTH_DESCRIPTION'
    },
    'date_start': {
      'required': 'TEXTS.REQ_START_CAMPAIGN'
    },
    'date_end': {
      'required': 'TEXTS.REQ_END_CAMPAIGN'
    },
  };

  buildUserForm(): void {
    this.userForm = this.formBuilder.group({
      'first_name' : [null, [
        Validators.required,
        Validators.minLength(2)
      ]
      ],
      'last_name' : [null, [
        Validators.required,
        Validators.minLength(2)
      ]
      ],
      'email' : [null, [
        Validators.required,
        Validators.email
      ]
      ],
      'role' : [null, [
        Validators.required
      ]
      ]
    });

    this.userForm.valueChanges
        .subscribe(data => this.onValueUserChanged(data));

    this.onValueUserChanged(); // (re)set validation messages now
  }

  onValueUserChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;

    for (const field in this.userFormErrors) {
      // clear previous error message (if any)
      this.userFormErrors[field] = [];
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.userValidationMessages[field];
        for (const key in control.errors) {
          this.userFormErrors[field].push(messages[key]);
        }
      }
    }
  }

  userFormErrors = {
    'first_name': [],
    'last_name': [],
    'email': [],
    'role': []
  };

  userValidationMessages = {
    'first_name': {
      'required': 'TEXTS.REQ_FIRST_NAME',
      'minlength': 'TEXTS.REQ_MINLENGTH_FIRST_NAME'
    },
    'last_name': {
      'required': 'TEXTS.REQ_LAST_NAME',
      'minlength': 'TEXTS.REQ_MINLENGTH_LAST_NAME'
    },
    'email': {
      'required': 'TEXTS.REQ_EMAIL',
      'email': 'TEXTS.PROVIDE_VALID_EMAIL'
    },
    'role': {
      'required': 'TEXTS.REQ_VALID_INPUT'
    },
  };

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
