import { Component, OnInit, Input } from '@angular/core'
import { IUser, User } from '../user/user'

@Component({
  selector: 'app-view-user',
  template: `
    <p>
      {{currentUser.fullName}} - {{currentUser.email}}
    </p>
  `,
  styles: [],
})
export class ViewUserComponent implements OnInit {
  @Input() user: IUser

  constructor() {}

  ngOnInit() {}

  get currentUser(): User {
    return User.BuildUser(this.user)
  }
}
