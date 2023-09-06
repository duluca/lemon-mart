import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http'
import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideFirebaseApp } from '@angular/fire/app'
import { getAuth, provideAuth } from '@angular/fire/auth'
import { MatDialogModule } from '@angular/material/dialog'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideRouter } from '@angular/router'
import { EntityDataModule, provideEntityData } from '@ngrx/data'
import { provideEffects } from '@ngrx/effects'
import { provideStore } from '@ngrx/store'
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { initializeApp } from 'firebase/app'
import { environment } from 'src/environments/environment'

import { routes } from './app.routes'
import { authFactory } from './auth/auth.factory'
import { AuthService } from './auth/auth.service'
import { AuthHttpInterceptor } from './auth/auth-http-interceptor'
import { provideUiService } from './common/ui.service'
import { entityConfig } from './entity-metadata'

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([AuthHttpInterceptor])),
    provideRouter(routes),
    provideStore(),
    provideEffects(),
    provideEntityData(entityConfig),
    provideStoreDevtools({ maxAge: 25, logOnly: environment.production }),
    {
      provide: AuthService,
      useFactory: authFactory,
      deps: [HttpClient],
    },
    provideUiService(),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => getAuth()),
      MatDialogModule // TODO: figure out how to provide in UiService
    ),
  ],
}
