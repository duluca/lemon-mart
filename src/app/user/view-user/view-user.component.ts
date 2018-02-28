import { Component, OnInit, Input } from '@angular/core'
import { IUser, User } from '../user/user'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-view-user',
  template: `
    <mat-card>
      <mat-card-header>
        <div mat-card-avatar><mat-icon>account_circle</mat-icon></div>
        <mat-card-title>{{currentUser.fullName}}</mat-card-title>
        <mat-card-subtitle>{{currentUser.role}}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p><span class="mat-input bold">E-mail</span></p>
        <p>{{currentUser.email}}</p>
        <p><span class="mat-input bold">Date of Birth</span></p>
        <p>{{currentUser.dateOfBirth | date:'mediumDate'}}</p>
      </mat-card-content>
      <mat-card-actions *ngIf="editMode">
        <button mat-button mat-raised-button>Edit</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
    .bold {
      font-weight: bold
    }
  `,
  ],
})
export class ViewUserComponent implements OnInit {
  @Input() user: IUser
  currentUser = new User()

  get editMode() {
    return !this.user
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    if (this.user) {
      this.currentUser = User.BuildUser(this.user)
    }

    if (this.route.snapshot && this.route.snapshot.data) {
      this.currentUser = User.BuildUser(this.route.snapshot.data['user'])
      this.currentUser.dateOfBirth = Date.now() // for data mocking purposes only
    }
  }
}
