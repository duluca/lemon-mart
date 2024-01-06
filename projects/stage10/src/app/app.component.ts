import { AsyncPipe } from '@angular/common'
import { NgOptimizedImage } from '@angular/common'
import { Component, DestroyRef, inject, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
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

import { AuthService } from './auth/auth.service'
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component'

@Component({
  selector: 'app-root',
  styles: `
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
        border-radius: 50%;
      }
    `,
  // prettier-ignore
  template: `
    <div class="app-container">
      @if ({
        status: authService.authStatus$ | async,
        user: authService.currentUser$ | async
        }; as auth;) {
        <mat-toolbar color="primary" fxLayoutGap="8px" class="app-toolbar" [class.app-is-mobile]="media.isActive('xs')"
          >
          @if (auth?.status?.isAuthenticated) {
            <button mat-icon-button (click)="sidenav.toggle()">
              <mat-icon>menu</mat-icon>
            </button>
          }
          <a mat-icon-button routerLink="/home">
            <mat-icon svgIcon="lemon"></mat-icon>
            <span class="left-pad" data-testid="title">LemonMart</span>
          </a>
          <span class="flex-spacer"></span>
          @if (auth?.status?.isAuthenticated) {
            <button mat-mini-fab routerLink="/user/profile" matTooltip="Profile"
              aria-label="User Profile">
              @if (auth?.user?.picture) {
                <img alt="Profile picture" class="image-cropper" [ngSrc]="auth?.user?.picture ?? ''" width="40px" height="40px" fill />
              }
              @if (!auth?.user?.picture) {
                <mat-icon>account_circle</mat-icon>
              }
            </button>
          }
          @if (auth?.status?.isAuthenticated) {
            <button mat-mini-fab routerLink="/user/logout" matTooltip="Logout"
              aria-label="Logout">
              <mat-icon>lock_open</mat-icon>
            </button>
          }
        </mat-toolbar>
      }
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
    FlexModule,
    RouterLink,
    NavigationMenuComponent,
    RouterOutlet,
    AsyncPipe,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    NgOptimizedImage,
  ],
})
export class AppComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef)
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
    combineLatest([this.media.asObservable(), this.authService.authStatus$])
      .pipe(
        takeUntilDestroyed(this.destroyRef),
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
}
