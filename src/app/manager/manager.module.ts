import { Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ManagerRoutingModule } from './manager-routing.module'
import { ManagerHomeComponent } from './manager-home/manager-home.component'

export const managerModuleRoutes: Routes = [{ path: '', component: ManagerHomeComponent }]

@NgModule({
  imports: [CommonModule],
  declarations: [ManagerHomeComponent],
})
export class ManagerModule {}
