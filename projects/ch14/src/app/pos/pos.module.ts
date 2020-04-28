import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { AppMaterialModule } from '../app-material.module'
import { PosRoutingModule } from './pos-routing.module'
import { PosComponent } from './pos/pos.component'

@NgModule({
  declarations: [PosComponent],
  imports: [CommonModule, PosRoutingModule, AppMaterialModule],
})
export class PosModule {}
