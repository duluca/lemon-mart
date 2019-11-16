import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'

import { IUser } from '../user/user/user'
import { IAuthService, IAuthStatus, defaultAuthStatus } from './auth.service'

@Injectable()
export class AuthServiceFake implements IAuthService {
  currentUser$: BehaviorSubject<IUser>
  authStatus$ = new BehaviorSubject<IAuthStatus>(defaultAuthStatus)
  constructor() {}

  login(email: string, password: string): Observable<void> {
    return of()
  }

  logout() {}

  getToken(): string {
    return ''
  }
}
