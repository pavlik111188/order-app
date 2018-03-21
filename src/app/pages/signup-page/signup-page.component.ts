import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Log } from 'ng2-logger';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})

export class SignupPageComponent implements OnInit {

  /** Logger */
  private log = Log.create('SignupPageComponent');

  /** signup form */
  public signupForm: FormGroup;

  /** template ref */
  public template: TemplateRef<any>;

  /** signup as user form ref */
  @ViewChild('formUser') formUser: TemplateRef<any>;
  /** signup as client form ref */
  @ViewChild('formClient') formClient: TemplateRef<any>;

  constructor(private formBuilder: FormBuilder) {
    // Signup form
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.email],
      clientUrl: [''],
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
      this.template = this.formClient;
    } else {
      this.template = this.formUser;
    }
  }

  /** Signup with credentials */
  signupWithCredentials() {

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
