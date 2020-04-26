import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'

import { MaterialModule } from './material.module'
import { FieldErrorModule } from './user-controls/field-error/field-error.module'
import { NameInputComponent } from './user/name-input/name-input.component'
import { ViewUserComponent } from './user/view-user/view-user.component'

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    FieldErrorModule,
  ],
  declarations: [ViewUserComponent, NameInputComponent],
  exports: [ViewUserComponent, NameInputComponent],
})
export class SharedComponentsModule {}
