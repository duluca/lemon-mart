import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { NgxMaskModule } from 'ngx-mask'

import { AuthGuard } from '../auth/auth-guard.service'
import { MaterialModule } from '../material.module'
import { SharedComponentsModule } from '../shared-components.module'
import { LemonRaterModule } from '../user-controls/lemon-rater/lemon-rater.module'
import { LogoutComponent } from './logout/logout.component'
import { ProfileComponent } from './profile/profile.component'
import { UserRoutingModule } from './user-routing.module'
import { UserMaterialModule } from './user.material.module'
import { UserEntityService } from './user/user.entity.service'
import { UserResolve } from './user/user.resolve'
import { UserService } from './user/user.service'

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    UserMaterialModule,
    SharedComponentsModule,
    LemonRaterModule,
    NgxMaskModule.forChild({ showMaskTyped: true, showTemplate: true }),
  ],
  declarations: [ProfileComponent, LogoutComponent],
  providers: [UserService, UserEntityService, AuthGuard, UserResolve],
})
export class UserModule {}
