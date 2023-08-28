import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { LemonRaterComponent } from './lemon-rater.component'

@NgModule({
  imports: [CommonModule],
  declarations: [LemonRaterComponent],
  exports: [LemonRaterComponent],
})
export class LemonRaterModule {}
