import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { InventoryHomeComponent } from './inventory-home.component'

describe('InventoryHomeComponent', () => {
  let component: InventoryHomeComponent
  let fixture: ComponentFixture<InventoryHomeComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [InventoryHomeComponent],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryHomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
