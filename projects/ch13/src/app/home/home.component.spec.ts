import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { createComponentMock } from 'angular-unit-test-helper'

import { commonTestingModules, commonTestingProviders } from '../common/common.testing'
import { HomeComponent } from './home.component'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HomeComponent, createComponentMock('LoginComponent')],
        providers: commonTestingProviders,
        imports: commonTestingModules,
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
