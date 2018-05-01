import {NgModule} from "@angular/core";

import {AppRoutingModule} from "../app-routing.module";
import {SharedModule} from "../shared/shared.module";
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
        AppRoutingModule,
        SharedModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        AppRoutingModule
    ]
})
export class CoreModule {}