import { TestBed, inject } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { MaterialModule } from '../material.module'
import { UiService } from './ui.service'

describe('UiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiService],
      imports: [ReactiveFormsModule, MaterialModule, NoopAnimationsModule],
    })
  })

  it('should be created', inject([UiService], (service: UiService) => {
    expect(service).toBeTruthy()
  }))
})
