import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@ngbracket/ngx-layout'

import { UserService } from '../user/user/user.service'
import { ManagerComponent } from './manager.component'
import { ManagerHomeComponent } from './manager-home/manager-home.component'
import { ManagerRoutingModule } from './manager-routing.module'
import { ReceiptLookupComponent } from './receipt-lookup/receipt-lookup.component'
import { UserManagementComponent } from './user-management/user-management.component'
import { UserTableComponent } from './user-table/user-table.component'

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ManagerComponent,
    ManagerHomeComponent,
    ManagerRoutingModule,
    ReactiveFormsModule,
    ReceiptLookupComponent,
    UserManagementComponent,
    UserTableComponent,
  ],
  providers: [UserService],
})
export class ManagerModule {}
