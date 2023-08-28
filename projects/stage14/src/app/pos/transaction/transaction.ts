import { TransactionType } from './transaction.enum'

export interface ITransaction {
  paymentType: TransactionType
  paymentAmount: number
  transactionId?: string
}
