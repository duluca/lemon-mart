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
import {
  MatStepperModule,
  MatRadioModule,
  MatDatepickerModule,
  MatSelectModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatLineModule,
  MatDividerModule,
  MatAutocompleteModule,
  MatNativeDateModule,
  MatListModule,
} from '@angular/material'
import { UserService } from './user/user.service'
import { ViewUserComponent } from './view-user/view-user.component'
import { AuthGuard } from '../auth/auth-guard.service'

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatStepperModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatLineModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatListModule,
  ],
  declarations: [ProfileComponent, LogoutComponent, ViewUserComponent],
  providers: [UserService, AuthGuard],
})
export class UserModule {}
