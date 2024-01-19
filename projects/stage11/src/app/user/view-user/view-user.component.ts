import { AsyncPipe, DatePipe } from '@angular/common'
import {
  Component,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDividerModule } from '@angular/material/divider'
import { MatIconModule } from '@angular/material/icon'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { Subscription } from 'rxjs'

import { IUser, User } from '../user/user'

@Component({
  selector: 'app-view-user',
  template: `
    @if (currentUser) {
      <div>
        <mat-card appearance="outlined">
          <mat-card-header style="border: 1px">
            <div
              mat-card-avatar
              [style.background-image]="'url(' + currentUser.picture + ')'"
              style="margin-right: 16px; background-size: cover;">
              @if (!currentUser.picture) {
                <mat-icon style="zoom: 1.8">account_circle</mat-icon>
              }
            </div>
            <mat-card-title-group>
              <mat-card-title>{{ currentUser.fullName }}</mat-card-title>
              <mat-card-subtitle>{{ currentUser.role }}</mat-card-subtitle>
            </mat-card-title-group>
            <div fxFlex></div>
            @if (editMode) {
              <mat-card-actions>
                <button mat-icon-button (click)="editUser(currentUser._id)">
                  <mat-icon>edit</mat-icon>
                </button>
              </mat-card-actions>
            }
          </mat-card-header>
          <mat-card-content>
            <mat-divider></mat-divider>
            <p><span class="mat-input bold">E-mail</span></p>
            <p>{{ currentUser.email }}</p>
            <p><span class="mat-input bold">Date of Birth</span></p>
            <p>{{ currentUser.dateOfBirth | date: 'mediumDate' }}</p>
          </mat-card-content>
        </mat-card>
      </div>
    }
  `,
  styles: `
      .bold {
        font-weight: bold;
      }
    `,
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    AsyncPipe,
    DatePipe,
  ],
})
export class ViewUserComponent implements OnInit, OnChanges, OnDestroy {
  private readonly route = inject(ActivatedRoute)
  private readonly router = inject(Router)
  private routerEventsSubscription?: Subscription

  @Input() user!: IUser
  currentUser = new User()

  get editMode() {
    return !this.user
  }

  ngOnInit() {
    // assignment on initial render
    this.assignUserFromRoute()

    this.routerEventsSubscription = this.router.events.subscribe((event) => {
      // assignment on subsequent renders
      if (event instanceof NavigationEnd) {
        this.assignUserFromRoute()
      }
    })
  }

  private assignUserFromRoute() {
    if (this.route.snapshot.data['user']) {
      this.currentUser = this.route.snapshot.data['user']
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentUser = User.Build(changes['user'].currentValue)
  }

  ngOnDestroy(): void {
    this.routerEventsSubscription?.unsubscribe()
  }

  editUser(id: string) {
    this.router.navigate(['/user/profile', id])
  }
}
