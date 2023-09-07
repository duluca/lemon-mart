import { HttpClient } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Apollo, gql } from 'apollo-angular'
import { first, map, Observable, Subject } from 'rxjs'
import { $enum } from 'ts-enum-util'

import { environment } from '../../environments/environment'
import { IUser, User } from '../user/user/user'
import { Role } from './auth.enum'
import { GET_ME, LOGIN } from './auth.graphql.queries'
import { AuthService, IAuthStatus, IServerAuthResponse } from './auth.service'

interface IJwtToken {
  email: string
  role: string
  picture: string
  iat: number
  exp: number
  sub: string
}

@Injectable()
export class CustomGraphQLAuthService extends AuthService {
  apollo: Apollo = inject(Apollo)

  protected authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse> {
    return this.apollo
      .mutate<{ login: IServerAuthResponse }>({
        mutation: LOGIN,
        variables: {
          email,
          password,
        },
      })
      .pipe(
        first(),
        map((result) => result.data?.login as IServerAuthResponse)
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
    return this.apollo
      .watchQuery<{ me: IUser }>({
        query: GET_ME,
      })
      .valueChanges.pipe(
        first(),
        map((result) => User.Build(result.data.me))
      )
  }
}
