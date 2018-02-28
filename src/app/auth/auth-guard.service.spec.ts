import { TestBed, inject } from '@angular/core/testing'

import { AuthGuard } from './auth-guard.service'
import { AuthService } from './auth.service'
import { AuthServiceFake } from './auth.service.fake'
import { UiService } from '../common/ui.service'
import { commonTestingModules } from '../common/common.testing'

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: commonTestingModules,
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: AuthServiceFake },
        UiService,
      ],
    })
  })

  it(
    'should be created',
    inject([AuthGuard], (service: AuthGuard) => {
      expect(service).toBeTruthy()
    })
  )
})
