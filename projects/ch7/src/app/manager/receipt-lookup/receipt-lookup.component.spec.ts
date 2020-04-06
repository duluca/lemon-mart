import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { ReceiptLookupComponent } from './receipt-lookup.component'

describe('ReceiptLookupComponent', () => {
  let component: ReceiptLookupComponent
  let fixture: ComponentFixture<ReceiptLookupComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiptLookupComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiptLookupComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
