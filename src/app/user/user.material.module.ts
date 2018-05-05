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
    MatListModule,
  ],
})
export class UserMaterialModule {}
