import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { ManagerComponent } from './manager.component'
import { ManagerHomeComponent } from './manager-home/manager-home.component'
import { ManagerRoutingModule } from './manager-routing.module'
import { ReceiptLookupComponent } from './receipt-lookup/receipt-lookup.component'
import { UserManagementComponent } from './user-management/user-management.component'

// Example of eager loading
// export const managerModuleRoutes: Routes = [{ path: '', component: ManagerHomeComponent }]

@NgModule({
  imports: [
    CommonModule,
    ManagerRoutingModule,
    ManagerHomeComponent,
    ManagerComponent,
    UserManagementComponent,
    ReceiptLookupComponent,
  ],
})
export class ManagerModule {}
