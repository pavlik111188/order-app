import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { Log } from 'ng2-logger';

import { Event } from '../../shared/event.model';
import { User } from '../../shared/user.model';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements OnInit {
  /** Logger */
  private log = Log.create('DashboardAdminComponent');

  events: Event[] = [
      new Event('pixbar', '11-12-2018', 'Senyavina str', '5'),
      new Event('pixbar', '11-12-2018', 'Senyavina str', '5')
  ];

  users: User[] = [
    new User('Dima', 'postoliuk@hotmail.com', 'Admin', 'Gold'),
    new User('Dima', 'postoliuk@hotmail.com', 'user', 'free')
  ];

  /** User modal form */
  public userForm: FormGroup;
  /** Event modal form  */
  public eventForm: FormGroup;
  /** Printing house modal form */
  public printingHouseForm: FormGroup;

  /** Edit user modal */
  @ViewChild('editUserModal') public editUserModal;
  /** Edit event modal */
  @ViewChild('editEventModal') public editEventModal;

  constructor(private formBuilder: FormBuilder,
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
    this.printingHouseForm = this.formBuilder.group({
      address: this.formBuilder.group({
        city: ['', Validators.required],
        email: ['', Validators.email],
        name: ['', Validators.required],
        phone: ['', Validators.required],
        street: ['', Validators.required],
        streetnumber: ['', Validators.required],
        zip: ['', Validators.required]
      }),
      paymentInformation: this.formBuilder.group({
        iban: ['', Validators.required],
        bic: ['', Validators.required],
        accountOwner: ['', Validators.required]
      }),
      id: ['', Validators.required],
      uid: ['', Validators.required],
      isDefault: [true, Validators.required]
    });
  }

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');
  }

  /**
   * Open edit event modal
   * @param  {Event} event Event
   */
  editEvent(event: Event) {
    this.editEventModal.show();
  }

  /**
   * Update event and hide modal
   */
  updateEvent() {

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
  deleteUser() {

  }

  /**
   * Update printing house
   */
  updatePrintingHouse() {

  }

  /**
   * Sete deleted value
   * @param  {Event} event Event
   */
  deleteEvent() {

  }

}
