import { HttpClient } from '@angular/common/http'

import { environment } from '../../environments/environment'
import { CustomAuthService } from './auth.custom.service'
import { AuthMode } from './auth.enum'
import { FirebaseAuthService } from './auth.firebase.service'
import { CustomGraphQLAuthService } from './auth.graphql.custom.service'
import { InMemoryAuthService } from './auth.inmemory.service'

export function authFactory(httpClient: HttpClient) {
  switch (environment.authMode) {
    case AuthMode.InMemory:
      return new InMemoryAuthService()
    case AuthMode.CustomServer:
      return new CustomAuthService(httpClient)
    case AuthMode.CustomGraphQL:
      return new CustomGraphQLAuthService()
    case AuthMode.Firebase:
      return new FirebaseAuthService()
  }
}
