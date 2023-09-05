import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { PosComponent } from './pos/pos.component'
import { PosRoutingModule } from './pos-routing.module'

@NgModule({
  imports: [CommonModule, PosRoutingModule, PosComponent],
})
export class PosModule {}
