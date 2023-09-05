import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http'
import { enableProdMode, importProvidersFrom } from '@angular/core'
import { provideFirebaseApp } from '@angular/fire/app'
import { provideAuth } from '@angular/fire/auth'
import { ReactiveFormsModule } from '@angular/forms'
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser'
import { provideAnimations } from '@angular/platform-browser/animations'
import { FlexLayoutModule } from '@ngbracket/ngx-layout'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

import { AppComponent } from './app/app.component'
import { AppRoutingModule } from './app/app-routing.module'
import { authFactory } from './app/auth/auth.factory'
import { AuthService } from './app/auth/auth.service'
import { AuthHttpInterceptor } from './app/auth/auth-http-interceptor'
import { environment } from './environments/environment'

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
      deps: [],
      // useClass: InMemoryAuthService,
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
