import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core'

import { SharedModule } from '../shared/shared.module';
import {DashboardsComponent} from "./dashboards.component";
import {DashboardAdminComponent} from "./dashboard-admin/dashboard-admin.component";
import {DashboardClientComponent} from "./dashboard-client/dashboard-client.component";
import {DashboardUserComponent} from "./dashboard-user/dashboard-user.component";

@NgModule({
    declarations: [
        DashboardsComponent,
        DashboardAdminComponent,
        DashboardClientComponent,
        DashboardUserComponent
    ],
    imports: [
        SharedModule
    ],
    schemas: [ NO_ERRORS_SCHEMA ]
})
export class DashboardsModule {}