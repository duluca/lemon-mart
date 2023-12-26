import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { $enum } from 'ts-enum-util'

import { environment } from '../../environments/environment'
import { transformError } from '../common/common'
import { IUser, User } from '../user/user/user'
import { Role } from './auth.enum'
import { AuthService, IAuthStatus, IServerAuthResponse } from './auth.service'

interface IJwtToken {
  email: string
  role: string
  picture: string
  iat: number
  exp: number
  sub: string
}

@Injectable({
  providedIn: 'root',
})
export class CustomAuthService extends AuthService {
  private httpClient: HttpClient = inject(HttpClient)

  protected authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse> {
    return this.httpClient.post<IServerAuthResponse>(
      `${environment.baseUrl}/v1/auth/login`,
      {
        email,
        password,
      }
    )
  }

  protected transformJwtToken(token: IJwtToken): IAuthStatus {
    return {
      isAuthenticated: token.email ? true : false,
      userId: token.sub,
      userRole: $enum(Role).asValueOrDefault(token.role, Role.None),
      userEmail: token.email,
      userPicture: token.picture,
    } as IAuthStatus
  }

  protected getCurrentUser(): Observable<User> {
    return this.httpClient
      .get<IUser>(`${environment.baseUrl}/v1/auth/me`)
      .pipe(map(User.Build, catchError(transformError)))
  }
}
