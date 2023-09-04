import { enableProdMode, importProvidersFrom } from '@angular/core'

import { environment } from './environments/environment'
import { AppComponent } from './app/app.component'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { entityConfig } from './app/entity-metadata'
import { EntityDataModule } from '@ngrx/data'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { getAuth } from 'firebase/auth'
import { provideAuth } from '@angular/fire/auth'
import { initializeApp } from 'firebase/app'
import { provideFirebaseApp } from '@angular/fire/app'
import { FlexLayoutModule } from '@ngbracket/ngx-layout'
import { ReactiveFormsModule } from '@angular/forms'
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
      ReactiveFormsModule,
      FlexLayoutModule,
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => getAuth()),
      StoreModule.forRoot({}),
      EffectsModule.forRoot([]),
      EntityDataModule.forRoot(entityConfig),
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
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
}).catch((err) => console.log(err))
