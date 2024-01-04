import { AsyncPipe } from '@angular/common'
import { Component } from '@angular/core'

import { AuthService } from '../auth/auth.service'
import { LoginComponent } from '../login/login.component'

@Component({
  selector: 'app-home',
  styles: `
      div[fxLayout] {
        margin-top: 32px;
      }
  `,
  template: `
    @if ((authService.authStatus$ | async)?.isAuthenticated) {
      <div>
        <div class="mat-headline-1">This is LemonMart! The place where</div>
        <div class="mat-headline-1">
          You get a lemon, you get a lemon, you get a lemon...
        </div>
        <div class="mat-headline-1">Everybody gets a lemon.</div>
      </div>
    } @else {
      <app-login></app-login>
    }
  `,
  standalone: true,
  imports: [LoginComponent, AsyncPipe],
})
export class HomeComponent {
  // displayLogin = true
  constructor(public authService: AuthService) {}
}
