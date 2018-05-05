import { TestBed, inject } from '@angular/core/testing'
import { AuthService } from '../../auth/auth.service'
import { AuthServiceFake } from '../../auth/auth.service.fake'
import { commonTestingModules } from '../../common/common.testing'
import { UiService } from '../../common/ui.service'
import { UserService } from './user.service'

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
