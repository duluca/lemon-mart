import { HttpClientTestingModule } from '@angular/common/http/testing'
import { TestBed, inject } from '@angular/core/testing'
import { AngularFireAuth } from '@angular/fire/auth'

import { UiService } from '../common/ui.service'
import { FirebaseAuthService } from './auth.firebase.service'

const angularFireStub = {
  user: jasmine.createSpyObj('user', ['subscribe']),
  auth: jasmine.createSpyObj('auth', ['signInWithEmailAndPassword', 'signOut']),
}

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FirebaseAuthService,
        UiService,
        { provide: AngularFireAuth, useValue: angularFireStub },
      ],
    })
  })

  it('should be created', inject(
    [FirebaseAuthService],
    (service: FirebaseAuthService) => {
      expect(service).toBeTruthy()
    }
  ))
})
