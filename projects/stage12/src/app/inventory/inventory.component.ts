import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-inventory',
  styles: `
      .active-link {
        font-weight: bold;
        border-bottom: 2px solid #005005;
      }
  `,
  template: `
    <mat-toolbar color="accent" fxLayoutGap="8px">
      <a mat-button routerLink="home" routerLinkActive="active-link">
        Inventory Dashboard
      </a>
      <a mat-button routerLink="stock-entry" routerLinkActive="active-link">
        Stock Entry
      </a>
      <a mat-button routerLink="products" routerLinkActive="active-link"> Products </a>
      <a mat-button routerLink="categories" routerLinkActive="active-link">
        Categories
      </a>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
})
export class InventoryComponent {}
