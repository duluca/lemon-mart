import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { UserRoutingModule } from './user-routing.module'
import { ProfileComponent } from './profile/profile.component'
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component'
import { LogoutComponent } from './logout/logout.component'
import { MaterialModule } from '../material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatStepperModule } from '@angular/material'

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
  ],
  declarations: [ProfileComponent, NavigationMenuComponent, LogoutComponent],
})
export class UserModule {}
