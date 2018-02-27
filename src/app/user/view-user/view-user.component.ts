import { Component, OnInit, Input } from '@angular/core'
import { IUser, User } from '../user/user'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-view-user',
  template: `
    <p>
      Name: {{currentUser.fullName}}
    </p>
    <p>
      Email: {{currentUser.email}}
    </p>
    <p>
      Birth: {{currentUser.dateOfBirth | date:'mediumDate'}}
    </p>
  `,
  styles: [],
})
export class ViewUserComponent implements OnInit {
  @Input() user: IUser
  currentUser = new User()

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    if (this.user) {
      this.currentUser = User.BuildUser(this.user)
    }

    if (this.route.snapshot && this.route.snapshot.data) {
      this.currentUser = User.BuildUser(this.route.snapshot.data['user'])
    }
  }
}
