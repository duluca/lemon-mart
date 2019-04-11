import { NgModule } from '@angular/core'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'

@NgModule({
  imports: [MatTableModule, MatSortModule, MatPaginatorModule, MatProgressSpinnerModule],
  exports: [MatTableModule, MatSortModule, MatPaginatorModule, MatProgressSpinnerModule],
})
export class ManagerMaterialModule {}
