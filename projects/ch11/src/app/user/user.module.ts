import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { NgxMaskModule } from 'ngx-mask'

import { AppMaterialModule } from '../app-material.module'
import { FieldErrorModule } from '../user-controls/field-error/field-error.module'
import { LemonRaterModule } from '../user-controls/lemon-rater/lemon-rater.module'
import { LogoutComponent } from './logout/logout.component'
import { NameInputComponent } from './name-input/name-input.component'
import { ProfileComponent } from './profile/profile.component'
import { ProfileInitialComponent } from './profile/profile.initial.component'
import { UserMaterialModule } from './user-material.module'
import { UserRoutingModule } from './user-routing.module'
import { ViewUserComponent } from './view-user/view-user.component'

@NgModule({
  declarations: [
    ProfileComponent,
    LogoutComponent,
    ViewUserComponent,
    NameInputComponent,
    ProfileInitialComponent, // Temp for Ch11 only
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FieldErrorModule,
    AppMaterialModule,
    UserMaterialModule,
    LemonRaterModule,
    NgxMaskModule.forChild(),
  ],
})
export class UserModule {}
