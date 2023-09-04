import { Component, OnDestroy, OnInit } from '@angular/core'
import { filter, tap } from 'rxjs/operators'
import { SubSink } from 'subsink'

import { UiService } from '../../common/ui.service'
import { ITransaction } from '../transaction/transaction'
import { TransactionType } from '../transaction/transaction.enum'
import { TransactionService } from '../transaction/transaction.service'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'

interface IEvent {
  event: 'checkoutCompleted' | 'checkoutInitiated'
}
declare let dataLayer: IEvent[]

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
})
export class PosComponent implements OnInit, OnDestroy {
  private subs = new SubSink()
  currentTransaction!: ITransaction
  constructor(
    private transactionService: TransactionService,
    private uiService: UiService
  ) {}

  ngOnInit() {
    this.currentTransaction = {
      paymentAmount: 25.78,
      paymentType: TransactionType.Credit,
    } as ITransaction
  }

  checkout(transaction: ITransaction) {
    this.uiService.showToast('Checkout initiated')
    dataLayer.push({
      event: 'checkoutInitiated',
    })
    this.subs.sink = this.transactionService
      .processTransaction(transaction)
      .pipe(
        filter((tx) => tx != null || tx !== undefined),
        tap(() => {
          this.uiService.showToast('Checkout completed')
          dataLayer.push({
            event: 'checkoutCompleted',
          })
        })
      )
      .subscribe()
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
