import { TestBed, inject } from '@angular/core/testing'

import { commonTestingModules, commonTestingProviders } from '../common/common.testing'
import { AuthGuard } from './auth-guard.service'

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: commonTestingModules,
      providers: [AuthGuard, commonTestingProviders],
    })
  })

  it('should be created', inject([AuthGuard], (service: AuthGuard) => {
    expect(service).toBeTruthy()
  }))
})
