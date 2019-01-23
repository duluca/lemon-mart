import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-manager',
  styles: [
    `
      .active-link {
        font-weight: bold;
        border-bottom: 2px solid #005005;
      }
    `,
  ],
  template: `
    <mat-toolbar color="accent" fxLayoutGap="8px">
      <a mat-button routerLink="/manager/home" routerLinkActive="active-link">
        Manager's Dashboard
      </a>
      <a mat-button routerLink="/manager/users" routerLinkActive="active-link">
        User Management
      </a>
      <a mat-button routerLink="/manager/receipts" routerLinkActive="active-link">
        Receipt Lookup
      </a>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
})
export class ManagerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
