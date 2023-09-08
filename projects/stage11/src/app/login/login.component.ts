import { NgFor, NgIf } from '@angular/common'
import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { ActivatedRoute, Router } from '@angular/router'
import { FlexModule } from '@ngbracket/ngx-layout/flex'
import { combineLatest } from 'rxjs'
import { catchError, filter, first, tap } from 'rxjs/operators'

import { environment } from '../../environments/environment'
import { AuthMode, Role } from '../auth/auth.enum'
import { AuthService } from '../auth/auth.service'
import { UiService } from '../common/ui.service'
import { EmailValidation, PasswordValidation } from '../common/validations'
import { FieldErrorDirective } from '../user-controls/field-error/field-error.directive'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styles: [
    `
      .error {
        color: red;
      }
    `,
    `
      div[fxLayout] {
        margin-top: 32px;
      }
    `,
  ],
  standalone: true,
  imports: [
    FlexModule,
    MatCardModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FieldErrorDirective,
    NgIf,
    MatButtonModule,
    MatExpansionModule,
    MatGridListModule,
    NgFor,
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroyRef = inject(DestroyRef)
  loginForm!: FormGroup
  loginError = ''
  redirectUrl!: string
  roles = Object.keys(Role)
  authMode = environment.authMode
  AuthMode = AuthMode
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    route: ActivatedRoute,
    private uiService: UiService
  ) {
    route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => (this.redirectUrl = params.get('redirectUrl') ?? ''))
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.')
  }

  ngOnInit() {
    this.authService.logout()
    this.buildLoginForm()
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', EmailValidation],
      password: ['', PasswordValidation],
    })
  }

  async login(submittedForm: FormGroup) {
    this.authService
      .login(submittedForm.value.email, submittedForm.value.password)
      .pipe(catchError((err) => (this.loginError = err)))

    combineLatest([this.authService.authStatus$, this.authService.currentUser$])
      .pipe(
        filter(([authStatus, user]) => authStatus.isAuthenticated && user?._id !== ''),
        first(),
        tap(([authStatus, user]) => {
          this.uiService.showToast(
            `Welcome ${user.fullName}! Role: ${authStatus.userRole}`
          )
          this.router.navigate([
            this.redirectUrl || this.homeRoutePerRole(user.role as Role),
          ])
        })
      )
      .subscribe()
  }

  private homeRoutePerRole(role: Role) {
    switch (role) {
      case Role.Cashier:
        return '/pos'
      case Role.Clerk:
        return '/inventory'
      case Role.Manager:
        return '/manager'
      default:
        return '/user/profile'
    }
  }
}
