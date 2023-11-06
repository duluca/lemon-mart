import { AuthMode } from '../app/auth/auth.enum'

export const environment = {
  production: true,
  baseUrl: 'http://localhost:3000',
  authMode: AuthMode.CustomServer,
}
