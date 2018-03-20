import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {CoreModule} from "./core/core.module";
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
