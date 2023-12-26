import { HttpHandlerFn, HttpRequest } from '@angular/common/http'
import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment'

import { UiService } from '../common/ui.service'
import { AuthService } from './auth.service'

export function AuthHttpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService)
  const router = inject(Router)
  const uiService = inject(UiService)

  const jwt = authService.getToken()
  const baseUrl = environment.baseUrl

  if (req.url.startsWith(baseUrl)) {
    const authRequest = req.clone({ setHeaders: { authorization: `Bearer ${jwt}` } })
    return next(authRequest).pipe(
      catchError((err) => {
        uiService.showToast(err.error.message)
        if (err.status === 401) {
          router.navigate(['/login'], {
            queryParams: { redirectUrl: router.routerState.snapshot.url },
          })
        }
        return throwError(() => err)
      })
    )
  } else {
    return next(req)
  }
}
