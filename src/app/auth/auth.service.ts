import { Injectable } from '@angular/core'
import { IUser, User } from './user'
import { Role } from './role.enum'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/throw'

export interface IAuthStatus {
  isAuthenticated: boolean
  userRole: Role
}

@Injectable()
export class AuthService {
  currentUser = new BehaviorSubject<User>(this.getItem('user') || new User())
  authStatus = new BehaviorSubject<IAuthStatus>(this.getItem('authStatus'))

  constructor() {
    this.authStatus.subscribe(authStatus => this.setItem('authStatus', authStatus))
    this.currentUser.subscribe(user => this.setItem('user', user))
  }

  private getItem<T>(key: string): T {
    let data = localStorage.getItem(key)
    if (data) {
      return JSON.parse(data)
    }
    return null
  }

  private setItem(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  login(email: string, password: string): Observable<IAuthStatus> {
    if (email.toLowerCase().endsWith('@test.com')) {
      this.authStatus.next({ isAuthenticated: true, userRole: Role.Manager })
      return this.authStatus.asObservable()
    } else {
      this.authStatus.next({ isAuthenticated: false, userRole: Role.None })
      return Observable.throw('Failed to login!')
    }
  }

  logout() {
    this.authStatus.next({ isAuthenticated: false, userRole: Role.None })
  }
}
