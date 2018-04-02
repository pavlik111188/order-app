import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";

import { Log } from 'ng2-logger';

import { UserService } from '../../shared/services/user.service';
import {ToastComponent} from "../../shared/toats/toast.component";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  /** Logger */
  private log = Log.create('SignupComponent');

  /** signup form */
  public signupForm: FormGroup;
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30),
    Validators.pattern('[a-zA-Z0-9_-\\s]*')
  ]);
  email = new FormControl('', [
    Validators.email
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  role = '';

  /** template ref */
  public template: TemplateRef<any>;

  /** signup as user form ref */
  @ViewChild('formUser') formUser: TemplateRef<any>;
  /** signup as client form ref */
  @ViewChild('formRestaurant') formRestaurant: TemplateRef<any>;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      public toast: ToastComponent,
      private userService: UserService) { }

  /** Initi component */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    this.template = this.formUser;
    this.role = 'user';

    // Signup form
    this.signupForm = this.formBuilder.group({
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    });
  }

  /** Switch between signup forms */
  switchForms() {
    this.signupForm.clearValidators();
    if (this.template === this.formUser) {
      this.template = this.formRestaurant;
    } else {
      this.template = this.formUser;
    }
  }

  /** Signup with credentials */
  signupWithCredentials() {
    console.log(this.signupForm.value);
    if (this.signupForm.valid) {
      this.userService.register(this.signupForm.value).subscribe(
          res => {
            this.log.d('Singed in with Email and password');
            this.toast.setMessage('you successfully registered!', 'success');
            this.router.navigate(['/login']);
            console.log(res)
          },
          error => {
            this.log.er('error', error);
            this.toast.setMessage('email already exists', 'danger')
          }
      );
    }
  }

  /** Signup with Google */
  loginWithGoogle() {

  }

  /** Signup with Facebook */
  loginWithFacebook() {

  }

  /** Signup with Twitter */
  loginWithTwitter() {

  }

}
