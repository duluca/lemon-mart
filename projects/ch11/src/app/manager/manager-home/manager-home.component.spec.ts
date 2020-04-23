import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { ManagerHomeComponent } from './manager-home.component'

describe('ManagerHomeComponent', () => {
  let component: ManagerHomeComponent
  let fixture: ComponentFixture<ManagerHomeComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerHomeComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerHomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
