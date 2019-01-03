import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AuthGuard } from '../auth/auth-guard.service'
import { MaterialModule } from '../material.module'
import { SharedComponentsModule } from '../shared-components.module'
import { LogoutComponent } from './logout/logout.component'
import { ProfileComponent } from './profile/profile.component'
import { UserRoutingModule } from './user-routing.module'
import { UserMaterialModule } from './user.material.module'
import { UserService } from './user/user.service'

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
