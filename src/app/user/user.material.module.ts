import { NgModule } from '@angular/core'
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

@NgModule({
  imports: [
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
  exports: [
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
})
export class UserMaterialModule {}
