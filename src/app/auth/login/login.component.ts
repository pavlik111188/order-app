import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  email = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  /**
   * reset password form group
   */
  public resetPasswordForm: FormGroup;

  constructor(private auth: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              public toast: ToastComponent) {
    // Init login form
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });

    // Init reset password form
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', Validators.email]
    });
  }

  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    if (this.auth.loggedIn) {
      this.router.navigate(['dashboard']);
    }
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    });
  }

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
