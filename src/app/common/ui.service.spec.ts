import { TestBed, inject } from '@angular/core/testing'

import { UiService } from './ui.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from '../material.module'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

describe('UiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiService],
      imports: [FormsModule, ReactiveFormsModule, MaterialModule, NoopAnimationsModule],
    })
  })

  it(
    'should be created',
    inject([UiService], (service: UiService) => {
      expect(service).toBeTruthy()
    })
  )
})
