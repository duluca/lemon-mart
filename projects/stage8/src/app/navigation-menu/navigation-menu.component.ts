import { Component } from '@angular/core'
import { MatListModule } from '@angular/material/list'
import { RouterLink, RouterLinkActive } from '@angular/router'

@Component({
  selector: 'app-navigation-menu',
  styles: `
      .active-link {
        font-weight: bold;
        border-left: 3px solid green;
      }
      .mat-mdc-subheader {
        font-weight: bold;
      }
  `,
  template: `
    <mat-nav-list>
      <h3 matSubheader>Manager</h3>
      <a mat-list-item routerLinkActive="active-link" routerLink="/manager/users"
        >Users</a
      >
      <a mat-list-item routerLinkActive="active-link" routerLink="/manager/receipts"
        >Receipts</a
      >
      <h3 matSubheader>Inventory</h3>
      <a mat-list-item routerLinkActive="active-link" routerLink="/inventory/stockEntry"
        >Stock Entry</a
      >
      <a mat-list-item routerLinkActive="active-link" routerLink="/inventory/products"
        >Products</a
      >
      <a mat-list-item routerLinkActive="active-link" routerLink="/inventory/categories"
        >Categories</a
      >
      <h3 matSubheader>Clerk</h3>
      <a mat-list-item routerLinkActive="active-link" routerLink="/pos">POS</a>
    </mat-nav-list>
  `,
  standalone: true,
  imports: [MatListModule, RouterLinkActive, RouterLink],
})
export class NavigationMenuComponent {}
