import {Component, OnDestroy, OnInit} from '@angular/core'

import { ITransaction } from '../transaction/transaction'
import { TransactionService } from '../transaction/transaction.service'
import { TransactionType } from '../transaction/transactionType.enum'
import {SubSink} from 'subsink';

interface IEvent {
  event: 'checkoutCompleted' | 'checkoutInitiated'
}
declare let dataLayer: IEvent[]

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css'],
})
export class PosComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  currentTransaction: ITransaction
  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.currentTransaction = {
      paymentAmount: 25.78,
      paymentType: TransactionType.Credit,
    } as ITransaction
  }

  checkout(transaction: ITransaction) {
    dataLayer.push({
      event: 'checkoutInitiated',
    });
    this.subs.sink = this.transactionService.processTransaction(transaction).subscribe(transactionId => {
      if (transactionId) {
        dataLayer.push({
          event: 'checkoutCompleted',
        })
      }
    })
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
