import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ManagerHomeComponent } from './manager-home/manager-home.component'

const routes: Routes = [
  { path: '', redirectTo: '/manager', pathMatch: 'full' },
  { path: 'manager', component: ManagerHomeComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}
