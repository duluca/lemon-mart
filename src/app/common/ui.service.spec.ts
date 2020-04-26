import { TestBed, inject } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'

import { AppMaterialModule } from '../app-material.module'
import { UiService } from './ui.service'

describe('UiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiService],
      imports: [ReactiveFormsModule, AppMaterialModule, NoopAnimationsModule],
    })
  })

  it('should be created', inject([UiService], (service: UiService) => {
    expect(service).toBeTruthy()
  }))
})
