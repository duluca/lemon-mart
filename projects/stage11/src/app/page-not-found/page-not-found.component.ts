import { Component } from '@angular/core'

@Component({
  selector: 'app-page-not-found',
  template: `
    <p>This page doesn't exist. Go back to <a routerLink="/home">home</a>.</p>
  `,
  styles: [],
})
export class PageNotFoundComponent {}
