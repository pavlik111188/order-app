import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";

import { Log } from 'ng2-logger';

import {AuthService} from "../../shared/services/auth.service";
import {ToastComponent} from "../../shared/toats/toast.component";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /**
   * Logger
   */
  private log = Log.create('LoginComponent');

  /**
   * Login form group
   */
  public loginForm: FormGroup;

  /**
   * reset password form group
   */
  public resetPasswordForm: FormGroup;

  constructor(private auth: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              public toast: ToastComponent) {

    // Init reset password form
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', Validators.email]
    });
  }

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    // Init login form
    this.buildLoginForm();

    if (this.auth.loggedIn) {
      this.router.navigate(['dashboard']);
    }
  }

  buildLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      'email' : [null, [
        Validators.required,
        Validators.email
      ]
      ],
      'password' : [null, [
        Validators.required,
        Validators.minLength(6)
      ]
      ]
    });

    this.loginForm.valueChanges
        .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.loginForm) { return; }
    const form = this.loginForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = [];
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field].push(messages[key]);
        }
      }
    }
  }

  formErrors = {
    'email': [],
    'password': []
  };

  validationMessages = {
    'email': {
      'required': 'TEXTS.REQ_EMAIL',
      'email': 'TEXTS.PROVIDE_VALID_EMAIL'
    },
    'password': {
      'required': 'TEXTS.PROVIDE_VALID_PASSWORD',
      'minlength': 'TEXTS.REQ_MINLENGTH_PASSWORD'
    }
  };

  /**
   * Login with credentials
   */
  loginWithCredentials() {
    this.auth.login(this.loginForm.value).subscribe(
        res => {
          this.log.d('Singed in with Email and password');
          this.router.navigate(['dashboard']);
        },
        error => {
          this.log.er('error', error);
          this.toast.setMessage('invalid email or password!', 'danger')
        }
    );
  }

  /**
   * Login with Google
   */
  loginWithGoogle() {

  }

  /**
   * Login with Facebook
   */
  loginWithFacebook() {

  }

  /**
   * Login with Twitter
   */
  loginWithTwitter() {

  }

  /**
   * Reset user password
   */
  resetPassword() {

  }
}
