import { HomeComponent } from './home/home.component'
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'manager', loadChildren: 'app/manager/manager.module#ManagerModule' },
  { path: 'user', loadChildren: 'app/user/user.module#UserModule' },
  { path: 'pos', loadChildren: 'app/pos/pos.module#PosModule' },
  { path: 'inventory', loadChildren: 'app/inventory/inventory.module#InventoryModule' },
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
