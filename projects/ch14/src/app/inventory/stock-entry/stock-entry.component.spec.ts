import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { StockEntryComponent } from './stock-entry.component'

describe('StockEntryComponent', () => {
  let component: StockEntryComponent
  let fixture: ComponentFixture<StockEntryComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [StockEntryComponent],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(StockEntryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
