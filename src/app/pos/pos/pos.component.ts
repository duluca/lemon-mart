import { Component, DestroyRef, inject, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { filter, tap } from 'rxjs/operators'

import { UiService } from '../../common/ui.service'
import { ITransaction } from '../transaction/transaction'
import { TransactionType } from '../transaction/transaction.enum'
import { TransactionService } from '../transaction/transaction.service'

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
export class PosComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef)
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
    this.transactionService
      .processTransaction(transaction)
      .pipe(
        filter((tx) => tx != null || tx !== undefined),
        tap(() => {
          this.uiService.showToast('Checkout completed')
          dataLayer.push({
            event: 'checkoutCompleted',
          })
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe()
  }
}
