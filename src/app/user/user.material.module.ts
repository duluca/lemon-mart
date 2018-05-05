import { NgModule } from '@angular/core'
import {
  MatAutocompleteModule,
  MatDatepickerModule,
  MatDividerModule,
  MatListModule,
  MatRadioModule,
  MatSelectModule,
  MatStepperModule,
  MatTooltipModule,
  MatNativeDateModule,
  MatLineModule,
  MatLine,
} from '@angular/material'

@NgModule({
  imports: [
    MatStepperModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatLineModule,
    MatListModule,
  ],
  exports: [
    MatStepperModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatLineModule,
    MatListModule,
  ],
})
export class UserMaterialModule {}
