import { NgModule } from '@angular/core'
import {
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
} from '@angular/material'

@NgModule({
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, MatProgressSpinnerModule],
  exports: [MatTableModule, MatSortModule, MatPaginatorModule, MatProgressSpinnerModule],
})
export class ManagerMaterialModule {}
