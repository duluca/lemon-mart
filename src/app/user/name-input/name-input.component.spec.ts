import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { commonTestingModules } from '../../common/common.testing'
import { NameInputComponent } from './name-input.component'

describe('NameInputComponent', () => {
  let component: NameInputComponent

  describe('DOM Tests', () => {
    let fixture: ComponentFixture<NameInputComponent>

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [...commonTestingModules, NameInputComponent],
      }).compileComponents()
    }))

    beforeEach(() => {
      fixture = TestBed.createComponent(NameInputComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
    })

    it('should create', () => {
      expect(component).toBeTruthy()
    })
  })
})
