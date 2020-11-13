import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { autoSpyObj, injectSpy } from 'angular-unit-test-helper'
import { of } from 'rxjs'

import { commonTestingModules } from '../../common/common.testing'
import { commonTestingProviders } from '../../common/common.testing'
import { TransactionService } from '../transaction/transaction.service'
import { PosComponent } from './pos.component'

describe('PosComponent', () => {
  let component: PosComponent
  let fixture: ComponentFixture<PosComponent>
  let transactionServiceMock: jasmine.SpyObj<TransactionService>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PosComponent],
        providers: commonTestingProviders.concat([
          { provide: TransactionService, useValue: autoSpyObj(TransactionService) },
        ]),
        imports: commonTestingModules,
      }).compileComponents(),
        (transactionServiceMock = injectSpy(TransactionService))
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(PosComponent)
    component = fixture.componentInstance
  })

  it('should create', () => {
    transactionServiceMock.processTransaction.and.returnValue(
      of('5a6352c6810c19729de860ea')
    )
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
