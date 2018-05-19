import { NgModule } from '@angular/core'
import {
  MatAutocompleteModule,
  MatDatepickerModule,
  MatDividerModule,
  MatLineModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSelectModule,
  MatStepperModule,
} from '@angular/material'

@NgModule({
  imports: [
    MatStepperModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatLineModule,
  ],
  exports: [
    MatStepperModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatLineModule,
  ],
})
export class UserMaterialModule {}
