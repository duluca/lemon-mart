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
    <app-login></app-login>
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
