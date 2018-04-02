import {NgModule} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import {AppRoutingModule} from "../app-routing.module";
import {SharedModule} from "../shared/shared.module";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from './footer/footer.component';
import {HomeComponent} from "./home/home.component";

/**
 * Configures ngx-translate HttpLoader
 * @param  {HttpClient} http Http CLient
 */
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        HomeComponent

    ],
    imports: [
        AppRoutingModule,
        SharedModule,
        MDBBootstrapModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        AppRoutingModule
    ]
})
export class CoreModule {}