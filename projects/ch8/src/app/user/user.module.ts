import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { LogoutComponent } from './logout/logout.component'
import { ProfileComponent } from './profile/profile.component'
import { UserRoutingModule } from './user-routing.module'

@NgModule({
  declarations: [ProfileComponent, LogoutComponent],
  imports: [CommonModule, UserRoutingModule],
})
export class UserModule {}
