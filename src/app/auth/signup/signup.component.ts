import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Log } from 'ng2-logger';

//import {AuthService} from "../auth.service";

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

  /** template ref */
  public template: TemplateRef<any>;

  /** signup as user form ref */
  @ViewChild('formUser') formUser: TemplateRef<any>;
  /** signup as client form ref */
  @ViewChild('formRestaurant') formRestaurant: TemplateRef<any>;

  constructor(
      //private auth: AuthService,
      private formBuilder: FormBuilder) {
    // Signup form
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.email],
      restaurantUrl: [''],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  /** Initi component */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    this.template = this.formUser;
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
/*    if (this.signupForm.valid) {
      this.auth
          .register(this.signupForm.value.email, this.signupForm.value.password)
          .then(() => {
            this.log.d('Singed in with Email and password');
            this.updateUser();
          })
          .catch(err => {
            this.error = err;
            this.log.er('error', err);
          });
    }*/
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
