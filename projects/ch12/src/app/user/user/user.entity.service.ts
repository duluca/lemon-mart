import { Injectable } from '@angular/core'
import {
  EntityActionOptions,
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

import { User } from './user'
import { UserService } from './user.service'

@Injectable({ providedIn: 'root' })
export class UserEntityService extends EntityCollectionServiceBase<User> {
  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private userService: UserService
  ) {
    super('User', serviceElementsFactory)
  }

  getAll(options?: EntityActionOptions): Observable<User[]> {
    return this.userService.getUsers(10).pipe(map((users) => users.data.map(User.Build)))
  }
}
