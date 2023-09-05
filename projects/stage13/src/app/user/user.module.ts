import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@ngbracket/ngx-layout'
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'

import { LogoutComponent } from './logout/logout.component'
import { ProfileComponent } from './profile/profile.component'
import { UserResolve } from './user/user.resolve'
import { UserRoutingModule } from './user-routing.module'

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
  providers: [UserResolve, provideNgxMask()],
})
export class UserModule {}
