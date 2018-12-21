import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { MaterialModule } from '../../material.module'
import { TransactionService } from '../transaction/transaction.service'
import { TransactionServiceFake } from '../transaction/transaction.service.fake'
import { PosComponent } from './pos.component'

describe('PosComponent', () => {
  let component: PosComponent
  let fixture: ComponentFixture<PosComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PosComponent],
      providers: [{ provide: TransactionService, useClass: TransactionServiceFake }],
      imports: [MaterialModule, NoopAnimationsModule],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PosComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
