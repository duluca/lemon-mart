import { provideHttpClient } from '@angular/common/http'
import { ApplicationConfig } from '@angular/core'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideRouter } from '@angular/router'

import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [provideAnimationsAsync(), provideHttpClient(), provideRouter(routes)],
}
