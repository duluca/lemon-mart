import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { commonTestingModules } from '../../common/common.testing'
import { ViewUserComponent } from './view-user.component'

describe('ViewUserComponent', () => {
  let component: ViewUserComponent
  let fixture: ComponentFixture<ViewUserComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [],
        imports: commonTestingModules,
        declarations: [ViewUserComponent],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
