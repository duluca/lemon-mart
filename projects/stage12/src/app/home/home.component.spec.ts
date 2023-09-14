import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { MockComponent } from 'ng-mocks'

import { commonTestingModules, commonTestingProviders } from '../common/common.testing'
import { LoginComponent } from '../login/login.component'
import { HomeComponent } from './home.component'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [...commonTestingProviders],
      imports: [...commonTestingModules, HomeComponent, MockComponent(LoginComponent)],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
