import { Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ManagerRoutingModule } from './manager-routing.module'
import { ManagerHomeComponent } from './manager-home/manager-home.component'
import { MaterialModule } from '../material.module'
import { UserManagementComponent } from './user-management/user-management.component'
import { ReceiptLookupComponent } from './receipt-lookup/receipt-lookup.component'
import { ManagerMaterialModule } from './manager.material.module'
import { ManagerComponent } from './manager.component'
import { AuthGuard } from '../auth/auth-guard.service'
import { UserTableComponent } from './user-table/user-table.component'
import { UserService } from '../user/user/user.service'
import { UserResolve } from '../user/user/user.resolve'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedComponentsModule } from '../shared-components.module'
import { FlexLayoutModule } from '@angular/flex-layout'

@NgModule({
  imports: [
    CommonModule,
    ManagerRoutingModule,
    ManagerMaterialModule,
    MaterialModule,
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
