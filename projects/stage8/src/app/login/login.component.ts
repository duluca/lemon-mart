import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { combineLatest } from 'rxjs'
import { catchError, filter, tap } from 'rxjs/operators'
import { SubSink } from 'subsink'

import { Role } from '../auth/auth.enum'
import { AuthService } from '../auth/auth.service'
import { UiService } from '../common/ui.service'
import { EmailValidation, PasswordValidation } from '../common/validations'
import { MatButtonModule } from '@angular/material/button'
import { NgIf } from '@angular/common'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { FlexModule } from '@ngbracket/ngx-layout/flex'

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
    NgIf,
    MatButtonModule,
  ],
})
export class LoginComponent implements OnInit {
  private subs = new SubSink()
  loginForm!: FormGroup
  loginError = ''
  redirectUrl!: string
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private uiService: UiService
  ) {
    this.subs.sink = route.paramMap.subscribe(
      (params) => (this.redirectUrl = params.get('redirectUrl') ?? '')
    )
  }

  ngOnInit() {
    this.authService.logout()
    this.buildLoginForm()
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', EmailValidation],
      password: ['', PasswordValidation],
      // email: ['', [Validators.required, Validators.email]],
      // password: [
      //   '',
      //   [Validators.required, Validators.minLength(8), Validators.maxLength(50)],
      // ],
    })
  }

  async login(submittedForm: FormGroup) {
    this.authService
      .login(submittedForm.value.email, submittedForm.value.password)
      .pipe(catchError((err) => (this.loginError = err)))

    this.subs.sink = combineLatest([
      this.authService.authStatus$,
      this.authService.currentUser$,
    ])
      .pipe(
        filter(([authStatus, user]) => authStatus.isAuthenticated && user?._id !== ''),
        tap(([authStatus, user]) => {
          this.uiService.showToast(
            `Welcome ${user.fullName}! Role: ${authStatus.userRole}`
          )
          // this.uiService.showDialog(`Welcome ${user.fullName}!`, `Role: ${authStatus.userRole}`)
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
