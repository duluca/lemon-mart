import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { LoginComponent } from './login.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from '../material.module'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { AuthService } from '../auth/auth.service'
import { AuthServiceFake } from '../auth/auth.service.fake'
import { RouterTestingModule } from '@angular/router/testing'
import { commonTestingModules, commonTestingProviders } from '../common/common.testing'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: commonTestingProviders,
      imports: commonTestingModules,
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
