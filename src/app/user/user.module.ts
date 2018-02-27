import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { UserRoutingModule } from './user-routing.module'
import { ProfileComponent } from './profile/profile.component'
import { LogoutComponent } from './logout/logout.component'
import { MaterialModule } from '../material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'

import { UserService } from './user/user.service'
import { AuthGuard } from '../auth/auth-guard.service'
import { UserMaterialModule } from './user.material.module'
import { SharedComponentsModule } from '../shared-components.module'

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    UserMaterialModule,
    SharedComponentsModule,
  ],
  declarations: [ProfileComponent, LogoutComponent],
  providers: [UserService, AuthGuard],
})
export class UserModule {}
