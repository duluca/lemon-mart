import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { authGuard } from '../auth/auth.guard'
import { LogoutComponent } from './logout/logout.component'
import { ProfileComponent } from './profile/profile.component'

const routes: Routes = [
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'logout', component: LogoutComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
