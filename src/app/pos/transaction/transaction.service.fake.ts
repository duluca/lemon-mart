import { Injectable } from '@angular/core'
import { ITransaction } from './transaction'
import { Observable } from 'rxjs/Observable'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class TransactionServiceFake {
  constructor() {}

  processTransaction(transaction: ITransaction): Observable<string> {
    return new BehaviorSubject<string>('5a6352c6810c19729de860ea').asObservable()
  }
}
