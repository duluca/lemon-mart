import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@ngbracket/ngx-layout'
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'

import { LogoutComponent } from './logout/logout.component'
import { NameInputComponent } from './name-input/name-input.component'
import { ProfileComponent } from './profile/profile.component'
import { ProfileInitialComponent } from './profile/profile.initial.component'
import { UserRoutingModule } from './user-routing.module'
import { ViewUserComponent } from './view-user/view-user.component'

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxMaskDirective,
    ProfileComponent,
    LogoutComponent,
    ViewUserComponent,
    NameInputComponent,
    ProfileInitialComponent, // Temp for stage11 only
  ],
  providers: [provideNgxMask()],
})
export class UserModule {}
