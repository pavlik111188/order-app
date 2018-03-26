import {NgModule} from "@angular/core";
import {MDBBootstrapModule} from 'angular-bootstrap-md';

import {HeaderComponent} from "./header/header.component";
import {AppRoutingModule} from "../app-routing.module";
import {FooterComponent} from './footer/footer.component';
import {HomeComponent} from "./home/home.component";


@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        HomeComponent

    ],
    imports: [
        MDBBootstrapModule.forRoot(),
        AppRoutingModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        AppRoutingModule
    ]
})
export class CoreModule {}