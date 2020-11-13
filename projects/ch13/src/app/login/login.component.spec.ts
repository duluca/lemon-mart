import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { commonTestingModules, commonTestingProviders } from '../common/common.testing'
import { FieldErrorModule } from '../user-controls/field-error/field-error.module'
import { LoginComponent } from './login.component'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoginComponent],
        providers: commonTestingProviders,
        imports: commonTestingModules.concat(FieldErrorModule),
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
