import { NgModule } from '@angular/core'
import { ServerModule } from '@angular/platform-server'

import { AppModule } from './app.module'
import { AppComponent } from './app.component'
import { Routes, RouterModule } from '@angular/router'
import { AppShellComponent } from './app-shell/app-shell.component'
import { FlexLayoutServerModule } from '@ngbracket/ngx-layout/server'

const routes: Routes = [{ path: 'shell', component: AppShellComponent }]

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    FlexLayoutServerModule,
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppComponent],
  declarations: [AppShellComponent],
})
export class AppServerModule {}
