import { AsyncPipe, NgIf } from '@angular/common'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule, MatIconRegistry } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { DomSanitizer } from '@angular/platform-browser'
import { RouterLink, RouterOutlet } from '@angular/router'
import { MediaObserver } from '@ngbracket/ngx-layout'
import { FlexModule } from '@ngbracket/ngx-layout/flex'
import { combineLatest } from 'rxjs'
import { tap } from 'rxjs/operators'
import { SubSink } from 'subsink'

import { AuthService } from './auth/auth.service'
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component'

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
      .image-cropper {
        width: 40px;
        height: 40px;
        position: relative;
        overflow: hidden;
        border-radius: 50%;
        margin-top: 3px;
      }
    `,
  ],
  // prettier-ignore
  template: `
    <div class="app-container">
      <mat-toolbar color="primary" fxLayoutGap="8px" class="app-toolbar" [class.app-is-mobile]="media.isActive('xs')"
        *ngIf="{
          status: authService.authStatus$ | async,
          user: authService.currentUser$ | async
        } as auth;">
        <button *ngIf="auth?.status?.isAuthenticated" mat-icon-button (click)="sidenav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        <a mat-icon-button routerLink="/home">
          <mat-icon svgIcon="lemon"></mat-icon>
          <span class="mat-h2" data-testid="title">LemonMart</span>
        </a>
        <span class="flex-spacer"></span>
        <button *ngIf="auth?.status?.isAuthenticated" mat-mini-fab routerLink="/user/profile" matTooltip="Profile"
          aria-label="User Profile">
          <img alt="Profile picture" *ngIf="auth?.user?.picture" class="image-cropper" [src]="auth?.user?.picture" />
          <mat-icon *ngIf="!auth?.user?.picture">account_circle</mat-icon>
        </button>
        <button *ngIf="auth?.status?.isAuthenticated" mat-mini-fab routerLink="/user/logout" matTooltip="Logout"
          aria-label="Logout">
          <mat-icon>lock_open</mat-icon>
        </button>
      </mat-toolbar>
      <mat-sidenav-container class="app-sidenav-container">
        <mat-sidenav #sidenav [mode]="media.isActive('xs') ? 'over' : 'side'" [fixedInViewport]="media.isActive('xs')" _
          fixedTopGap="56" [(opened)]="opened">
          <app-navigation-menu></app-navigation-menu>
        </mat-sidenav>
        <mat-sidenav-content>
          <router-outlet></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  standalone: true,
  imports: [
    NgIf,
    FlexModule,
    RouterLink,
    NavigationMenuComponent,
    RouterOutlet,
    AsyncPipe,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
  ],
})
export class AppComponent implements OnInit, OnDestroy {
  private subs = new SubSink()
  opened!: boolean

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public authService: AuthService,
    public media: MediaObserver
  ) {
    iconRegistry.addSvgIcon(
      'lemon',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/lemon.svg')
    )
  }

  ngOnInit() {
    this.subs.sink = combineLatest([
      this.media.asObservable(),
      this.authService.authStatus$,
    ])
      .pipe(
        tap(([mediaValue, authStatus]) => {
          if (!authStatus?.isAuthenticated) {
            this.opened = false
          } else {
            if (mediaValue[0].mqAlias === 'xs') {
              this.opened = false
            } else {
              this.opened = true
            }
          }
        })
      )
      .subscribe()
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
