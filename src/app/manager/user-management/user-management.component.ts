import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-user-management',
  template: `
    <div fxLayout="row">
    <router-outlet name="master"></router-outlet>
    </div>
        <div fxLayout="row">
    <router-outlet name="detail"></router-outlet>
    </div>
  `,
})
export class UserManagementComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
