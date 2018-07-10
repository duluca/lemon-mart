import { Component } from '@angular/core'

import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-home',
  template: `
    <div *ngIf="!(authService.authStatus | async).isAuthenticated">
      <app-login></app-login>
    </div>
    <div *ngIf="(authService.authStatus | async).isAuthenticated">
      <span class="mat-display-3">You get a lemon, you get a lemon...</span>
    </div>
  `,
})
export class HomeComponent {
  constructor(public authService: AuthService) {}
}
