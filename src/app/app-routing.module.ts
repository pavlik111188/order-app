import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";

import {HomeComponent} from "./core/home/home.component";
import {DashboardsComponent} from "./dashboards/dashboards.component";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'dashboard', component: DashboardsComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}