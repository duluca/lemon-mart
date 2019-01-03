import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'

import { ITransaction } from './transaction'

@Injectable()
export class TransactionService {
  constructor() {}

  processTransaction(transaction: ITransaction): Observable<string> {
    return new BehaviorSubject<string>('5a6352c6810c19729de860ea').asObservable()
  }
}
