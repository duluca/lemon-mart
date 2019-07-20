import { NgModule } from '@angular/core'
import { MatSlideToggleModule } from '@angular/material'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'

@NgModule({
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
  ],
  exports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
  ],
})
export class ManagerMaterialModule {}
