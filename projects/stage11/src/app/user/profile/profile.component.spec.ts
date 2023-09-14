import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import {
  autoSpyObj,
  injectSpy,
  ObservablePropertyStrategy,
} from 'angular-unit-test-helper'
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'

import { AuthService } from '../../auth/auth.service'
import { defaultAuthStatus } from '../../auth/auth.service'
import { commonTestingModules, commonTestingProviders } from '../../common/common.testing'
import { User } from '../../user/user/user'
import { ViewUserComponent } from '../../user/view-user/view-user.component'
import { NameInputComponent } from '../name-input/name-input.component'
import { ProfileComponent } from './profile.component'

describe('ProfileComponent', () => {
  let component: ProfileComponent
  let fixture: ComponentFixture<ProfileComponent>
  let authServiceMock: jasmine.SpyObj<AuthService>

  beforeEach(waitForAsync(() => {
    const authServiceSpy = autoSpyObj(
      AuthService,
      ['currentUser$', 'authStatus$'],
      ObservablePropertyStrategy.BehaviorSubject
    )

    TestBed.configureTestingModule({
      providers: [
        ...commonTestingProviders,
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
        provideNgxMask(),
      ],
      imports: [
        ...commonTestingModules,
        NgxMaskDirective,
        ProfileComponent,
        NameInputComponent,
        ViewUserComponent,
      ],
    }).compileComponents()

    authServiceMock = injectSpy(AuthService)

    fixture = TestBed.createComponent(ProfileComponent)
    component = fixture.debugElement.componentInstance
  }))

  it('should create', () => {
    authServiceMock.currentUser$.next(new User())
    authServiceMock.authStatus$.next(defaultAuthStatus)

    fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
