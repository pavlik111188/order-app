import { HttpClient } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {StoreModule} from "@ngrx/store";

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import { SharedModule } from './shared/shared.module';
import {CoreModule} from "./core/core.module";
import {AuthModule} from "./auth/auth.module";
import {DashboardsModule} from "./dashboards/dashboars.module";
import {AuthService} from "./shared/services/auth.service";
import {UserService} from "./shared/services/user.service";
import { reducers } from './store/app.reducers';
import {EventService} from "./shared/services/event.service";


export function tokenGetter() {
  return localStorage.getItem('token');
}

/**
 * Configures ngx-translate HttpLoader
 * @param  {HttpClient} http Http CLient
 */
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SharedModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        // whitelistedDomains: ['localhost:3000', 'localhost:4200']
      }
    }),
    AuthModule,
    CoreModule,
    DashboardsModule,
    StoreModule.forRoot(reducers),
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [
    AuthService,
    UserService,
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
