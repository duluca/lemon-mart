import { enableProdMode, importProvidersFrom } from '@angular/core'

import { environment } from './environments/environment'
import { AppComponent } from './app/app.component'
import { FlexLayoutModule } from '@ngbracket/ngx-layout'
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http'
import { provideAnimations } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app/app-routing.module'
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser'

if (environment.production) {
  enableProdMode()
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule, FlexLayoutModule),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch((err) => console.error(err))
