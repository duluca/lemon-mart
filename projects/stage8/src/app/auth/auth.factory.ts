import { environment } from '../../environments/environment'
import { AuthMode } from './auth.enum'
import { FirebaseAuthService } from './auth.firebase.service'
import { InMemoryAuthService } from './auth.in-memory.service'

export function authFactory() {
  switch (environment.authMode) {
    case AuthMode.InMemory:
      return new InMemoryAuthService()
    case AuthMode.Firebase:
      return new FirebaseAuthService()
    case AuthMode.CustomServer:
      throw new Error('Not yet implemented')
  }
}
