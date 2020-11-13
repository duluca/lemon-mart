import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { ReceiptLookupComponent } from './receipt-lookup.component'

describe('ReceiptLookupComponent', () => {
  let component: ReceiptLookupComponent
  let fixture: ComponentFixture<ReceiptLookupComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ReceiptLookupComponent],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptLookupComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
