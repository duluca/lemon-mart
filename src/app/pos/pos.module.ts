import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PosRoutingModule } from './pos-routing.module'
import { PosComponent } from './pos/pos.component'

@NgModule({
  imports: [CommonModule, PosRoutingModule],
  declarations: [PosComponent],
})
export class PosModule {}
