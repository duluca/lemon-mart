import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { PosRoutingModule } from './pos-routing.module'
import { PosComponent } from './pos/pos.component'
import { MaterialModule } from '../material.module'
import { TransactionService } from './transaction/transaction.service'

@NgModule({
  imports: [CommonModule, PosRoutingModule, MaterialModule],
  declarations: [PosComponent],
  providers: [TransactionService],
})
export class PosModule {}
