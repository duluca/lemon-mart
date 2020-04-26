import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { NgxMaskModule } from 'ngx-mask'
import { UserMaterialModule } from 'src/app/user/user.material.module'

import { MaterialModule } from '../material.module'
import { FieldErrorModule } from '../user-controls/field-error/field-error.module'
import { LemonRaterModule } from '../user-controls/lemon-rater/lemon-rater.module'
import { LogoutComponent } from './logout/logout.component'
import { NameInputComponent } from './name-input/name-input.component'
import { ProfileComponent } from './profile/profile.component'
import { ProfileInitialComponent } from './profile/profile.initial.component'
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
    MaterialModule,
    UserMaterialModule,
    LemonRaterModule,
    NgxMaskModule.forChild({ showMaskTyped: true, showTemplate: true }),
  ],
})
export class UserModule {}
