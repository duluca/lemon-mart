import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http'
import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideFirebaseApp } from '@angular/fire/app'
import { getAuth, provideAuth } from '@angular/fire/auth'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { initializeApp } from 'firebase/app'
import { environment } from 'src/environments/environment'

import { routes } from './app.routes'
import { authFactory } from './auth/auth.factory'
import { AuthHttpInterceptor } from './auth/auth.http.interceptor'
import { AuthService } from './auth/auth.service'
import { provideUiService } from './common/ui.service'

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([AuthHttpInterceptor])),
    provideRouter(routes),
    provideStore(),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
    {
      provide: AuthService,
      useFactory: authFactory,
      deps: [HttpClient],
    },
    provideUiService(),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => getAuth())
    ),
  ],
}
