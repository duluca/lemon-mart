import { inject } from '@angular/core'
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router'
import { catchError, map } from 'rxjs/operators'

import { transformError } from '../../common/common'
import { User } from './user'
import { UserService } from './user.service'

export const userResolver: ResolveFn<User> = (route: ActivatedRouteSnapshot) => {
  return inject(UserService)
    .getUser(route.paramMap.get('userId'))
    .pipe(map(User.Build), catchError(transformError))
}
