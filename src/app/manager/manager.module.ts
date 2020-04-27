import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppMaterialModule } from '../app-material.module'
import { AuthGuard } from '../auth/auth-guard.service'
import { SharedComponentsModule } from '../shared-components.module'
import { UserResolve } from '../user/user/user.resolve'
import { UserService } from '../user/user/user.service'
import { ManagerHomeComponent } from './manager-home/manager-home.component'
import { ManagerMaterialModule } from './manager-material.module'
import { ManagerRoutingModule } from './manager-routing.module'
import { ManagerComponent } from './manager.component'
import { ReceiptLookupComponent } from './receipt-lookup/receipt-lookup.component'
import { UserManagementComponent } from './user-management/user-management.component'
import { UserTableComponent } from './user-table/user-table.component'

@NgModule({
  imports: [
    CommonModule,
    ManagerRoutingModule,
    ManagerMaterialModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    FlexLayoutModule,
  ],
  declarations: [
    ManagerComponent,
    ManagerHomeComponent,
    UserManagementComponent,
    ReceiptLookupComponent,
    UserTableComponent,
  ],
  providers: [AuthGuard, UserService, UserResolve],
})
export class ManagerModule {}
