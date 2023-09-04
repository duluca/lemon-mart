import { TestBed, waitForAsync } from '@angular/core/testing'
import { MediaObserver } from '@ngbracket/ngx-layout'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'
import {
  ObservablePropertyStrategy,
  autoSpyObj,
  injectSpy,
} from 'angular-unit-test-helper'

import { MockComponent } from 'ng-mocks'

import { AppComponent } from './app.component'
import { AuthService, defaultAuthStatus } from './auth/auth.service'
import {
  DomSanitizerFake,
  MatIconRegistryFake,
  MediaObserverFake,
  commonTestingModules,
} from './common/common.testing'
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component'

describe('AppComponent', () => {
  let authServiceMock: jasmine.SpyObj<AuthService>

  beforeEach(waitForAsync(() => {
    const authServiceSpy = autoSpyObj(
      AuthService,
      ['authStatus$'],
      ObservablePropertyStrategy.BehaviorSubject
    )

    TestBed.configureTestingModule({
      imports: [
        ...commonTestingModules,
        MockComponent(NavigationMenuComponent),
        AppComponent,
      ],
      providers: [
        { provide: MediaObserver, useClass: MediaObserverFake },
        { provide: MatIconRegistry, useClass: MatIconRegistryFake },
        { provide: DomSanitizer, useClass: DomSanitizerFake },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    }).compileComponents()

    authServiceMock = injectSpy(AuthService)
    authServiceMock.authStatus$.next(defaultAuthStatus)
  }))

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance
    expect(app).toBeTruthy()
  }))

  it('should render app-container', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    const compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector('.app-container')).toBeDefined()
  }))
})
