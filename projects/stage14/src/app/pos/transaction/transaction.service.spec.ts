import { HttpClientTestingModule } from '@angular/common/http/testing'
import { inject, TestBed } from '@angular/core/testing'

import { TransactionService } from './transaction.service'

describe('TransactionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TransactionService],
    })
  })

  it('should be created', inject([TransactionService], (service: TransactionService) => {
    expect(service).toBeTruthy()
  }))
})
