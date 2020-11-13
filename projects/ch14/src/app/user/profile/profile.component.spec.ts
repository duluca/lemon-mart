import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import {
  ObservablePropertyStrategy,
  autoSpyObj,
  injectSpy,
} from 'angular-unit-test-helper'

import { AuthService } from '../../auth/auth.service'
import { defaultAuthStatus } from '../../auth/auth.service'
import { commonTestingModules, commonTestingProviders } from '../../common/common.testing'
import { FieldErrorModule } from '../../user-controls/field-error/field-error.module'
import { LemonRaterModule } from '../../user-controls/lemon-rater/lemon-rater.module'
import { User } from '../../user/user/user'
import { ViewUserComponent } from '../../user/view-user/view-user.component'
import { NameInputComponent } from '../name-input/name-input.component'
import { UserMaterialModule } from '../user-material.module'
import { ProfileComponent } from './profile.component'

describe('ProfileComponent', () => {
  let component: ProfileComponent
  let fixture: ComponentFixture<ProfileComponent>
  let authServiceMock: jasmine.SpyObj<AuthService>

  beforeEach(
    waitForAsync(() => {
      const authServiceSpy = autoSpyObj(
        AuthService,
        ['currentUser$', 'authStatus$'],
        ObservablePropertyStrategy.BehaviorSubject
      )

      TestBed.configureTestingModule({
        providers: commonTestingProviders.concat({
          provide: AuthService,
          useValue: authServiceSpy,
        }),
        imports: commonTestingModules.concat([
          UserMaterialModule,
          FieldErrorModule,
          LemonRaterModule,
        ]),
        declarations: [ProfileComponent, NameInputComponent, ViewUserComponent],
      }).compileComponents()

      authServiceMock = injectSpy(AuthService)

      fixture = TestBed.createComponent(ProfileComponent)
      component = fixture.debugElement.componentInstance
    })
  )

  it('should create', () => {
    authServiceMock.currentUser$.next(new User())
    authServiceMock.authStatus$.next(defaultAuthStatus)

    fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
