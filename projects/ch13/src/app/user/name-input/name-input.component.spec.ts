import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { commonTestingModules } from '../../common/common.testing'
import { FieldErrorModule } from '../../user-controls/field-error/field-error.module'
import { NameInputComponent } from './name-input.component'

describe('NameInputComponent', () => {
  let component: NameInputComponent

  describe('DOM Tests', () => {
    let fixture: ComponentFixture<NameInputComponent>

    beforeEach(
      waitForAsync(() => {
        TestBed.configureTestingModule({
          declarations: [NameInputComponent],
          imports: commonTestingModules.concat(FieldErrorModule),
        }).compileComponents()
      })
    )

    beforeEach(() => {
      fixture = TestBed.createComponent(NameInputComponent)
      component = fixture.componentInstance
      fixture.detectChanges()
    })

    it('should create', () => {
      expect(component).toBeTruthy()
    })
  })

  describe('Functional Tests', () => {})
})
