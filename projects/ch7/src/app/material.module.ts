import { NgModule } from '@angular/core'
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip'

const modules = [MatButtonModule, MatToolbarModule, MatIconModule, MatTooltipModule]

@NgModule({
  exports: modules,
})
export class MaterialModule {}
