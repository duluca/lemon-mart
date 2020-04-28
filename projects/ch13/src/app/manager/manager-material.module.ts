import { NgModule } from '@angular/core'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'

const modules = [
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSlideToggleModule,
] as any[]

@NgModule({
  exports: modules,
})
export class ManagerMaterialModule {}
