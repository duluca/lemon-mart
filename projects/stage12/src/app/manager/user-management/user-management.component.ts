import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-user-management',
  template: `
    <div class="h-pad">
      <router-outlet name="master"></router-outlet>
      <div style="min-height: 10px"></div>
      <router-outlet name="detail"></router-outlet>
    </div>
  `,
  standalone: true,
  imports: [RouterOutlet],
})
export class UserManagementComponent {}
