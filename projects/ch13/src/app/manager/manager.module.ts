import { AppMaterialModule } from '../app-material.module'
import { AuthGuard } from '../auth/auth-guard.service'
import { CommonModule } from '@angular/common'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ManagerComponent } from './manager.component'
import { ManagerHomeComponent } from './manager-home/manager-home.component'
import { ManagerMaterialModule } from './manager-material.module'
import { ManagerRoutingModule } from './manager-routing.module'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { ReceiptLookupComponent } from './receipt-lookup/receipt-lookup.component'
import { SharedComponentsModule } from '../shared-components.module'
import { UserManagementComponent } from './user-management/user-management.component'
import { UserResolve } from '../user/user/user.resolve'
import { UserService } from '../user/user/user.service'
import { UserTableComponent } from './user-table/user-table.component'

@NgModule({
  imports: [
    CommonModule,
    ManagerRoutingModule,
    SharedComponentsModule,
    AppMaterialModule,
    ManagerMaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  declarations: [
    ManagerHomeComponent,
    ManagerComponent,
    UserManagementComponent,
    ReceiptLookupComponent,
    UserTableComponent,
  ],
  providers: [AuthGuard, UserService, UserResolve],
})
export class ManagerModule {}
