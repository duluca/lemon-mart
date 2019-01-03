import { TestBed, inject } from '@angular/core/testing'

import { commonTestingModules } from '../common/common.testing'
import { UiService } from '../common/ui.service'
import { AuthGuard } from './auth-guard.service'
import { AuthService } from './auth.service'
import { AuthServiceFake } from './auth.service.fake'

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

  it('should be created', inject([AuthGuard], (service: AuthGuard) => {
    expect(service).toBeTruthy()
  }))
})
