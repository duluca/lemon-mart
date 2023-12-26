import { TestBed, waitForAsync } from '@angular/core/testing'
import { getNativeElementByTestId } from 'angular-unit-test-helper'

import { AppComponent } from './app.component'
import { commonTestingModules } from './common/common.testing'

describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [...commonTestingModules, AppComponent],
      providers: [],
    }).compileComponents()
  }))

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  })

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()

    const titleElement = getNativeElementByTestId(fixture, 'title')
    expect(titleElement.textContent).toContain('LemonMart')
  })
})
