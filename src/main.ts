import {
  HTTP_INTERCEPTORS,
  HttpClient,
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
import { EntityDataModule } from '@ngrx/data'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

import { AppComponent } from './app/app.component'
import { AppRoutingModule } from './app/app-routing.module'
import { authFactory } from './app/auth/auth.factory'
import { AuthService } from './app/auth/auth.service'
import { AuthHttpInterceptor } from './app/auth/auth-http-interceptor'
import { entityConfig } from './app/entity-metadata'
import { environment } from './environments/environment'

if (environment.production) {
  enableProdMode()
}

bootstrapApplication(AppComponent, appConfig).catch((err) => console.log(err))
