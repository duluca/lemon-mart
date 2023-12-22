import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
import { catchError, map } from 'rxjs/operators'

import { environment } from '../../../environments/environment'
import { AuthService } from '../../auth/auth.service'
import { CacheService } from '../../common/cache.service'
import { transformError } from '../../common/common'
import { IUser, User } from './user'

export interface IUserService {
  getUser(id: string): Observable<IUser>
  updateUser(id: string, user: IUser): Observable<IUser>
}

@Injectable({
  providedIn: 'root',
})
export class UserService implements IUserService {
  private readonly cache = inject(CacheService)
  private readonly httpClient = inject(HttpClient)
  private readonly authService = inject(AuthService)

  getUser(id: string | null): Observable<IUser> {
    if (id === null) {
      return throwError(() => 'User id is not set')
    }

    return this.httpClient.get<IUser>(`${environment.baseUrl}/v2/user/${id}`)
  }

  updateUser(id: string, user: IUser): Observable<IUser> {
    if (id === '') {
      return throwError(() => 'User id is not set')
    }

    // cache user data in case of errors
    this.cache.setItem('draft-user', Object.assign(user, { _id: id }))
    const updateResponse$ = this.httpClient
      .put<IUser>(`${environment.baseUrl}/v2/user/${id}`, user)
      .pipe(map(User.Build), catchError(transformError))

    updateResponse$.subscribe({
      next: (res) => {
        this.authService.currentUser$.next(res)
        this.cache.removeItem('draft-user')
      },
      error: (err) => throwError(() => err),
    })

    return updateResponse$
  }
}
