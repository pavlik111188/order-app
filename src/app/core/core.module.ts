import {NgModule} from "@angular/core";
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import {HeaderComponent} from "./header/header.component";
import {HomeComponent} from "./home/home.component";
import {AppRoutingModule} from "../app-routing.module";

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        MDBBootstrapModule.forRoot(),
        AppRoutingModule
    ],
    exports: [
        HeaderComponent,
        AppRoutingModule
    ]
})
export class CoreModule {}