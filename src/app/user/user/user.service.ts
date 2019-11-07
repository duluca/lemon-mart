import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, throwError as observableThrowError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

import { environment } from '../../../environments/environment'
import { AuthService, IAuthStatus } from '../../auth/auth.service'
import { CacheService } from '../../auth/cache.service'
import { transformError } from '../../common/common'
import { IUser, User } from './user'

export interface IUsers {
  data: IUser[]
  total: number
}

export interface IUserService {
  readonly currentUser$: BehaviorSubject<IUser>
  getCurrentUser(): Observable<IUser>
  getUser(id): Observable<IUser>
  updateUser(user: IUser): Observable<IUser>
  getUsers(pageSize: number, searchText: string, pagesToSkip: number): Observable<IUsers>
}

@Injectable()
export class UserService extends CacheService implements IUserService {
  readonly currentUser$ = new BehaviorSubject<IUser>(this.getItem('user') || new User())
  private currentAuthStatus: IAuthStatus
  constructor(private httpClient: HttpClient, private authService: AuthService) {
    super()
    this.currentUser$.subscribe(user => this.setItem('user', user))
    this.authService.authStatus$.subscribe(
      authStatus => (this.currentAuthStatus = authStatus)
    )
  }

  getCurrentUser(): Observable<IUser> {
    const userObservable = this.getUser(this.currentAuthStatus.userId).pipe(
      catchError(transformError)
    )

    userObservable.pipe(
      tap(user => this.currentUser$.next(user), err => observableThrowError(err))
    )
    return userObservable
  }

  getUser(id): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.baseUrl}/v2/user/${id}`)
  }

  updateUser(user: IUser): Observable<IUser> {
    this.setItem('draft-user', user) // cache user data in case of errors
    const updateResponse = this.httpClient
      .put<IUser>(`${environment.baseUrl}/v2/user/${user._id || 0}`, user)
      .pipe(catchError(transformError))

    updateResponse.pipe(
      tap(
        res => {
          this.currentUser$.next(res)
          this.removeItem('draft-user')
        },
        err => observableThrowError(err)
      )
    )

    return updateResponse
  }

  getUsers(
    pageSize: number,
    searchText = '',
    pagesToSkip = 0,
    sortColumn = '',
    sortDirection: '' | 'asc' | 'desc' = 'asc'
  ): Observable<IUsers> {
    const recordsToSkip = pageSize * pagesToSkip
    if (sortColumn) {
      sortColumn = sortDirection === 'desc' ? `-${sortColumn}` : sortColumn
    }
    return this.httpClient.get<IUsers>(`${environment.baseUrl}/v2/users`, {
      params: {
        filter: searchText,
        skip: recordsToSkip.toString(),
        limit: pageSize.toString(),
        sortKey: sortColumn,
      },
    })
  }
}
