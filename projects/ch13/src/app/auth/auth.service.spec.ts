import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { autoSpyObj } from 'angular-unit-test-helper'

import { UiService } from '../common/ui.service'
import { AuthService } from './auth.service'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, { provide: UiService, useValue: autoSpyObj(UiService) }],
    })
    service = TestBed.inject(AuthService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
