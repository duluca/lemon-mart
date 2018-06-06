import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'
import { IUser, User } from './user'
import { IUsers, IUserService } from './user.service'

@Injectable()
export class UserServiceFake implements IUserService {
  currentUser = new BehaviorSubject<IUser>(new User())

  constructor() {}

  getCurrentUser(): Observable<IUser> {
    return of(new User())
  }

  getUser(id): Observable<IUser> {
    return of(new User((id = id)))
  }

  updateUser(user: IUser): Observable<IUser> {
    return of(user)
  }

  getUsers(pageSize: number, searchText = '', pagesToSkip = 0): Observable<IUsers> {
    return of({
      total: 1,
      items: [new User()],
    } as IUsers)
  }
}
