import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { PosRoutingModule } from './pos-routing.module'
import { PosComponent } from './pos/pos.component'

@NgModule({
  declarations: [PosComponent],
  imports: [CommonModule, PosRoutingModule],
})
export class PosModule {}
