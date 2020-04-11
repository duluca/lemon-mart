import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { PosComponent } from './pos/pos.component'

const routes: Routes = [{ path: '', component: PosComponent }]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PosRoutingModule {}
