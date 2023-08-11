import { Component } from '@angular/core'

@Component({
  selector: 'app-user-management',
  template: `
    <div class="horizontal-padding">
      <router-outlet name="master"></router-outlet>
      <div style="min-height: 10px"></div>
      <router-outlet name="detail"></router-outlet>
    </div>
  `,
})
export class UserManagementComponent {}
