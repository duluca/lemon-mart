import { NgModule } from '@angular/core'
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete'
import { MatLineModule, MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatDividerModule } from '@angular/material/divider'
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio'
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select'
import { MatStepperModule } from '@angular/material/stepper'

const modules = [
  MatStepperModule,
  MatRadioModule,
  MatDatepickerModule,
  MatSelectModule,
  MatDividerModule,
  MatAutocompleteModule,
  MatNativeDateModule,
  MatLineModule,
] as any[]

@NgModule({
  exports: modules,
})
export class UserMaterialModule {}
