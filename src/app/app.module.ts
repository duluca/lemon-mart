import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import 'hammerjs'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component'
import { MaterialModule } from './material.module'
import { ManagerModule } from './manager/manager.module'
import { InventoryModule } from './inventory/inventory.module'
import { PosModule } from './pos/pos.module'
import { UserModule } from './user/user.module'
import { HomeComponent } from './home/home.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [AppComponent, HomeComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    ManagerModule,
    InventoryModule,
    PosModule,
    UserModule,
    HttpClientModule,
    ManagerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
