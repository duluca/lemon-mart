import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@ngbracket/ngx-layout'
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'

import { LogoutComponent } from './logout/logout.component'
import { ProfileComponent } from './profile/profile.component'
import { UserEntityService } from './user/user.entity.service'
import { UserResolve } from './user/user.resolve'
import { UserService } from './user/user.service'
import { UserRoutingModule } from './user-routing.module'
import { DateAdapter } from '@angular/material/core'

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxMaskDirective,
    ProfileComponent,
    LogoutComponent,
  ],
  providers: [UserService, UserEntityService, UserResolve, provideNgxMask()],
})
export class UserModule {}
