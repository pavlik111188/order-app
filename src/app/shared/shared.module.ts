import {NgModule, ModuleWithProviders} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import {TranslateModule} from "@ngx-translate/core";
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import {LoadingComponent} from "./loading/loading.component";
import {ToastComponent} from "./toats/toast.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        TranslateModule,
        MDBBootstrapModule
    ],
    exports: [
        // Shared Modules
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        TranslateModule,
        MDBBootstrapModule,
        // Shared Components
        ToastComponent,
        LoadingComponent
    ],
    declarations: [
        ToastComponent,
        LoadingComponent
    ],
    providers: [
        ToastComponent
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}