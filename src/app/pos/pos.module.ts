import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { PosComponent } from './pos/pos.component'
import { PosRoutingModule } from './pos-routing.module'
import { TransactionService } from './transaction/transaction.service'

@NgModule({
  imports: [CommonModule, PosRoutingModule, PosComponent],
  providers: [TransactionService],
})
export class PosModule {}
