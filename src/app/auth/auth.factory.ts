import { environment } from '../../environments/environment'
import { CustomAuthService } from './auth.custom.service'
import { AuthMode } from './auth.enum'
import { FirebaseAuthService } from './auth.firebase.service'
import { CustomGraphQLAuthService } from './auth.graphql.custom.service'
import { InMemoryAuthService } from './auth.in-memory.service'

export function authFactory() {
  switch (environment.authMode) {
    case AuthMode.InMemory:
      return new InMemoryAuthService()
    case AuthMode.CustomServer:
      return new CustomAuthService()
    case AuthMode.CustomGraphQL:
      return new CustomGraphQLAuthService()
    case AuthMode.Firebase:
      return new FirebaseAuthService()
  }
}
