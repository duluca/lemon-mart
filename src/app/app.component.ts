import { Component, OnInit, ViewChild } from '@angular/core'
import { ObservableMedia } from '@angular/flex-layout'
import { MatIconRegistry, MatSidenav } from '@angular/material'
import { DomSanitizer } from '@angular/platform-browser'

import { AuthService } from './auth/auth.service'

@Component({
  selector: 'app-root',
  styles: [
    `
      .app-container {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
      .app-is-mobile .app-toolbar {
        position: fixed;
        z-index: 2;
      }
      .app-sidenav-container {
        flex: 1;
      }
      .app-is-mobile .app-sidenav-container {
        flex: 1 0 auto;
      }
      mat-sidenav {
        width: 200px;
      }
    `,
  ],
  template: `
    <div class="app-container">
      <mat-toolbar
        color="primary"
        fxLayoutGap="8px"
        class="app-toolbar"
        [class.app-is-mobile]="media.isActive('xs')"
        *ngIf="(authService.authStatus | async) as authStatus"
      >
        <button
          *ngIf="authStatus.isAuthenticated"
          mat-icon-button
          (click)="sidenav.toggle()"
        >
          <mat-icon>menu</mat-icon>
        </button>
        <a mat-icon-button routerLink="/home">
          <mat-icon svgIcon="lemon"></mat-icon>
          <span class="mat-h2">LemonMart</span>
        </a>
        <span class="flex-spacer"></span>
        <button
          *ngIf="authStatus.isAuthenticated"
          mat-mini-fab
          routerLink="/user/profile"
          matTooltip="Profile"
          aria-label="User Profile"
        >
          <mat-icon>account_circle</mat-icon>
        </button>
        <button
          *ngIf="authStatus.isAuthenticated"
          mat-mini-fab
          routerLink="/user/logout"
          matTooltip="Logout"
          aria-label="Logout"
        >
          <mat-icon>lock_open</mat-icon>
        </button>
      </mat-toolbar>
      <mat-sidenav-container class="app-sidenav-container">
        <mat-sidenav
          #sidenav
          [mode]="media.isActive('xs') ? 'over' : 'side'"
          [fixedInViewport]="media.isActive('xs')"
          fixedTopGap="56"
        >
          <app-navigation-menu></app-navigation-menu>
        </mat-sidenav>
        <mat-sidenav-content>
          <router-outlet class="app-container"></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') public sideNav: MatSidenav
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public authService: AuthService,
    public media: ObservableMedia
  ) {
    iconRegistry.addSvgIcon(
      'lemon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/lemon.svg')
    )
  }

  ngOnInit() {
    this.authService.authStatus.subscribe(authStatus => {
      if (!authStatus.isAuthenticated) {
        this.sideNav.close()
      }
    })
  }
}
