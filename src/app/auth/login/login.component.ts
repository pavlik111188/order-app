import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Log } from 'ng2-logger';

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

  constructor(private formBuilder: FormBuilder) {
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
  }

  /**
   * Login with credentials
   */
  loginWithCredentials() {

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
