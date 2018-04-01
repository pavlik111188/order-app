import {NgModule} from "@angular/core";
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import {AppRoutingModule} from "../app-routing.module";
import {HeaderComponent} from "./header/header.component";
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