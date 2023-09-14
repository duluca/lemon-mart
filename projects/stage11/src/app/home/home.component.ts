import { AsyncPipe, NgIf } from '@angular/common'
import { Component } from '@angular/core'

import { AuthService } from '../auth/auth.service'
import { LoginComponent } from '../login/login.component'

@Component({
  selector: 'app-home',
  styles: [
    `
      div[fxLayout] {
        margin-top: 32px;
      }
    `,
  ],
  template: `
    <div *ngIf="(authService.authStatus$ | async)?.isAuthenticated; else doLogin">
      <div class="mat-headline-1">This is LemonMart! The place where</div>
      <div class="mat-headline-1">
        You get a lemon, you get a lemon, you get a lemon...
      </div>
      <div class="mat-headline-1">Everybody gets a lemon.</div>
    </div>
    <ng-template #doLogin>
      <app-login></app-login>
    </ng-template>
  `,
  standalone: true,
  imports: [NgIf, LoginComponent, AsyncPipe],
})
export class HomeComponent {
  constructor(public authService: AuthService) {}
}
