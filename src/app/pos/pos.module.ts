import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { AppMaterialModule } from '../app-material.module'
import { PosRoutingModule } from './pos-routing.module'
import { PosComponent } from './pos/pos.component'
import { TransactionService } from './transaction/transaction.service'

@NgModule({
  imports: [CommonModule, PosRoutingModule, AppMaterialModule],
  declarations: [PosComponent],
  providers: [TransactionService],
})
export class PosModule {}
