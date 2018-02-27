import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FlexLayoutModule } from '@angular/flex-layout'

import { AppRoutingModule } from './app-routing.module'
import 'hammerjs'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppComponent } from './app.component'
import { MaterialModule } from './material.module'
import { HomeComponent } from './home/home.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { HttpClientModule } from '@angular/common/http'
import { LoginComponent } from './login/login.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { AuthService } from './auth/auth.service'
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component'
import {
  MatSidenavModule,
  MatListModule,
  MatDialogModule,
  MatSnackBarModule,
} from '@angular/material'
import { AuthGuard } from './auth/auth-guard.service'
import { SimpleDialog, UiService } from './common/ui.service'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    NavigationMenuComponent,
    SimpleDialog,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [AuthService, AuthGuard, UiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
