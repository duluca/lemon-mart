import { Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ManagerRoutingModule } from './manager-routing.module'
import { ManagerHomeComponent } from './manager-home/manager-home.component'

@NgModule({
  imports: [CommonModule, ManagerRoutingModule],
  declarations: [ManagerHomeComponent],
})
export class ManagerModule {}
