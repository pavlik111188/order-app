import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";

import { Log } from 'ng2-logger';

import { UserService } from '../../shared/services/user.service';
import {ToastComponent} from "../../shared/toats/toast.component";
import { PasswordValidation } from '../../shared/validators/password-match';

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

  constructor(
      private fb: FormBuilder,
      private router: Router,
      public toast: ToastComponent,
      private userService: UserService) { }

  /** Initi component */
  ngOnInit() {
    this.log.color = 'orange';
    this.log.d('Component initialized');

    // Signup form
    this.buildSignupForm();
  }

  /** Signup forms validation */
  buildSignupForm(): void {
    this.signupForm = this.fb.group({
      'first_name' : [null, [
        Validators.minLength(2),
        Validators.maxLength(30),
        Validators.pattern('[a-zA-Z0-9_-\\s]*')
      ]
    ],
    'email' : [null, [
      Validators.required,
      Validators.email
      ]
    ],
    'password' : [null, [
      Validators.required,
      Validators.minLength(6)
      ]
    ],
    'passwordConfirm' : [null, [
        Validators.required
      ]
    ],
    'role' : [null, [
        Validators.required
      ]
    ]
    }, {
      validator: PasswordValidation.MatchPassword
    });

    this.signupForm.valueChanges
        .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.signupForm) { return; }
    const form = this.signupForm;

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

  /** Errors array */
  formErrors = {
    'first_name': [],
    'email': [],
    'password': [],
    'passwordConfirm': [],
    'role': []
  };

  /** Validation messages */
  validationMessages = {
    'first_name': {
      'minlength': 'TEXTS.REQ_MINLENGTH_NICKNAME',
      'maxLength': 'TEXTS.REQ_MAXLENGTH_NICKNAME',
      'pattern': 'TEXTS.REQ_PATTERN_NICKNAME',
    },
    'email': {
      'required': 'TEXTS.REQ_EMAIL',
      'email': 'TEXTS.PROVIDE_VALID_EMAIL'
    },
    'password': {
      'required': 'TEXTS.PROVIDE_VALID_PASSWORD',
      'minlength': 'TEXTS.REQ_MINLENGTH_PASSWORD'
    },
    'passwordConfirm': {
      'required': 'TEXTS.PROVIDE_VALID_PASSWORD',
      'MatchPassword': 'TEXTS.PROVIDE_MATCH_PASSWORD'
    },
    'role': {
      'required': 'TEXTS.PROVIDE_VALID_PASSWORD'
    }
  };

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
