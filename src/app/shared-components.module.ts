import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MaterialModule } from './material.module'
import { NameInputComponent } from './user/name-input/name-input.component'
import { ViewUserComponent } from './user/view-user/view-user.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  declarations: [ViewUserComponent, NameInputComponent],
  exports: [ViewUserComponent, NameInputComponent],
})
export class SharedComponentsModule {}
