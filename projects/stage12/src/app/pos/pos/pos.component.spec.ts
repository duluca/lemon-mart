import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { PosComponent } from './pos.component'

describe('PosComponent', () => {
  let component: PosComponent
  let fixture: ComponentFixture<PosComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PosComponent],
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
