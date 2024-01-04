import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'
import { FlexModule } from '@ngbracket/ngx-layout/flex'

@Component({
  selector: 'app-manager',
  styles: `
      div[fxLayout] {
        margin-top: 32px;
      }
      .active-link {
        font-weight: bold;
        border-bottom: 2px solid #005005;
      }
  `,
  template: `
    <mat-toolbar color="accent" fxLayoutGap="8px">
      <a mat-button routerLink="home" routerLinkActive="active-link"
        >Manager's Dashboard</a
      >
      <a mat-button routerLink="users" routerLinkActive="active-link">User Management</a>
      <a mat-button routerLink="receipts" routerLinkActive="active-link"
        >Receipt Lookup</a
      >
      <span class="flex-spacer"></span>
      <button
        mat-mini-fab
        routerLink="/inventory"
        matTooltip="Inventory"
        aria-label="Inventory">
        <mat-icon>list</mat-icon>
      </button>
      <button mat-mini-fab routerLink="/pos" matTooltip="POS" aria- label="POS">
        <mat-icon>shopping_cart</mat-icon>
      </button>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [
    MatToolbarModule,
    FlexModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    MatTooltipModule,
    MatIconModule,
    RouterOutlet,
  ],
})
export class ManagerComponent {}
