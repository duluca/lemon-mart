import { Injectable, Injector } from '@angular/core'
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http'
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch'
import { AuthService } from './auth.service'
import { Router } from '@angular/router'

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = this.authService.getToken()
    const authRequest = req.clone({ headers: req.headers.set('authorization', jwt) })
    return next.handle(authRequest).catch((err, caught) => {
      if (err.status === 401) {
        this.router.navigate(['/user/login'], {
          queryParams: { redirectUrl: this.router.routerState.snapshot.url },
        })
      }

      return Observable.throw(err)
    })
  }
}
