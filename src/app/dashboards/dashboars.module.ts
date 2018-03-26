import {BrowserModule} from "@angular/platform-browser";
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core'
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {DashboardsComponent} from "./dashboards.component";
import {DashboardAdminComponent} from "./dashboard-admin/dashboard-admin.component";
import {DashboardRestaurantComponent} from "./dashboard-restaurant/dashboard-restaurant.component";
import {DashboardUserComponent} from "./dashboard-user/dashboard-user.component";

/**
 * Configures ngx-translate HttpLoader
 * @param  {HttpClient} http Http CLient
 */
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        DashboardsComponent,
        DashboardAdminComponent,
        DashboardRestaurantComponent,
        DashboardUserComponent
    ],
    imports: [
        BrowserModule,
        MDBBootstrapModule.forRoot(),
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    schemas: [ NO_ERRORS_SCHEMA ]
})
export class DashboardsModule {}