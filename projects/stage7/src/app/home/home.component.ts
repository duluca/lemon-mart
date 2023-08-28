import { Component } from '@angular/core'

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
    <div fxLayout="column" fxLayoutAlign="center center">
      <span class="mat-headline-3">Hello, Limoncu!</span>
      <button mat-raised-button color="primary" routerLink="/manager">
        Login as Manager
      </button>
    </div>
  `,
})
export class HomeComponent {}
