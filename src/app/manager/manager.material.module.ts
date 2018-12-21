import { NgModule } from '@angular/core'
import {
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material'

@NgModule({
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, MatProgressSpinnerModule],
  exports: [MatTableModule, MatSortModule, MatPaginatorModule, MatProgressSpinnerModule],
})
export class ManagerMaterialModule {}
