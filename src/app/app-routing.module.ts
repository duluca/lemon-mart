import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthGuard } from './auth/auth-guard.service'
import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/:redirectUrl', component: LoginComponent },
  {
    path: 'manager',
    loadChildren: 'app/manager/manager.module#ManagerModule',
    canLoad: [AuthGuard],
  },
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
