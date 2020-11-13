import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { commonTestingModules } from '../common/common.testing'
import { InventoryComponent } from './inventory.component'

describe('InventoryComponent', () => {
  let component: InventoryComponent
  let fixture: ComponentFixture<InventoryComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: commonTestingModules,
        declarations: [InventoryComponent],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
