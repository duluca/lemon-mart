import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { LogoutComponent } from './logout.component'
import { commonTestingProviders, commonTestingModules } from '../../common/common.testing'

describe('LogoutComponent', () => {
  let component: LogoutComponent
  let fixture: ComponentFixture<LogoutComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: commonTestingProviders,
      imports: commonTestingModules,
      declarations: [LogoutComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
