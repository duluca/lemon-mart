import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, Resolve } from '@angular/router'
import { catchError, map } from 'rxjs/operators'

import { transformError } from '../../common/common'
import { IUser, User } from './user'
import { UserService } from './user.service'

@Injectable()
export class UserResolve implements Resolve<IUser> {
  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.userService
      .getUser(route.paramMap.get('userId'))
      .pipe(map(User.Build), catchError(transformError))
  }
}
