import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {LoadingComponent} from "./loading/loading.component";
import {ToastComponent} from "./toats/toast.component";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    exports: [
        // Shared Modules
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
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
export class SharedModule { }