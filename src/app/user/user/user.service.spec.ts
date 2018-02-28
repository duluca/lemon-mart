import { TestBed, inject } from '@angular/core/testing'

import { UserService } from './user.service'
import { commonTestingModules } from '../../common/common.testing'
import { AuthService } from '../../auth/auth.service'
import { AuthServiceFake } from '../../auth/auth.service.fake'
import { UiService } from '../../common/ui.service'

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [commonTestingModules],
      providers: [
        UserService,
        { provide: AuthService, useClass: AuthServiceFake },
        UiService,
      ],
    })
  })

  it(
    'should be created',
    inject([UserService], (service: UserService) => {
      expect(service).toBeTruthy()
    })
  )
})
