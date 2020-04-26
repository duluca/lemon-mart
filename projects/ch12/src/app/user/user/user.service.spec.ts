import { TestBed, inject } from '@angular/core/testing'

import { commonTestingModules, commonTestingProviders } from '../../common/common.testing'
import { UserService } from './user.service'

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [commonTestingModules],
      providers: [UserService, commonTestingProviders],
    })
  })

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy()
  }))
})
