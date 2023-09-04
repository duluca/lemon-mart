import { enableProdMode, importProvidersFrom } from '@angular/core'

import { environment } from './environments/environment'
import { AppComponent } from './app/app.component'
import { provideAuth, getAuth } from '@angular/fire/auth'
import { initializeApp } from 'firebase/app'
import { provideFirebaseApp } from '@angular/fire/app'
import { ReactiveFormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@ngbracket/ngx-layout'
import { provideAnimations } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app/app-routing.module'
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser'
import { AuthHttpInterceptor } from './app/auth/auth-http-interceptor'
import {
  HttpClient,
  HTTP_INTERCEPTORS,
  withInterceptorsFromDi,
  provideHttpClient,
} from '@angular/common/http'
import { authFactory } from './app/auth/auth.factory'
import { AuthService } from './app/auth/auth.service'

if (environment.production) {
  enableProdMode()
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      FlexLayoutModule,
      ReactiveFormsModule,
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => getAuth())
    ),
    {
      provide: AuthService,
      useFactory: authFactory,
      deps: [HttpClient],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch((err) => console.error(err))
