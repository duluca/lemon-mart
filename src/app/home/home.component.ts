import { Component, OnInit } from '@angular/core'
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-home',
  styles: [
    `
    div[fxLayout] {margin-top: 32px;}
  `,
  ],
  template: `
    <div fxLayout="row" fxLayoutAlign="center">
      <mat-card fxFlex="400px">
        <mat-card-header>
          <mat-card-title><div class="mat-headline">Hello, Lemonite!</div></mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <app-login></app-login>
        </mat-card-content>
      </mat-card>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  displayLogin = true
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.authStatus.subscribe(
      authStatus => (this.displayLogin = authStatus.isAuthenticated)
    )
  }
}
