import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { autoSpyObj } from 'angular-unit-test-helper'

import { AppMaterialModule } from '../../app-material.module'
import { commonTestingProviders } from '../../common/common.testing'
import { TransactionService } from '../transaction/transaction.service'
import { PosComponent } from './pos.component'

describe('PosComponent', () => {
  let component: PosComponent
  let fixture: ComponentFixture<PosComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PosComponent],
      providers: commonTestingProviders.concat([
        { provide: TransactionService, useValue: autoSpyObj(TransactionService) },
      ]),
      imports: [AppMaterialModule, NoopAnimationsModule],
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
