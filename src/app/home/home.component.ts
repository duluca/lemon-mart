import { Component } from '@angular/core'

import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-home',
  template: `
    <div *ngIf="!(authService.authStatus$ | async).isAuthenticated">
      <app-login></app-login>
    </div>
    <div *ngIf="(authService.authStatus$ | async).isAuthenticated">
      <div class="mat-display-4">
        This is LemonMart! The place where
      </div>
      <div class="mat-display-4">
        You get a lemon, you get a lemon, you get a lemon...
      </div>
      <div class="mat-display-4">
        Everbody gets a lemon.
      </div>
    </div>
  `,
})
export class HomeComponent {
  constructor(public authService: AuthService) {}
}
