import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { HomeComponent } from './home.component'
import { MaterialModule } from '../material.module'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { LoginComponent } from '../login/login.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AuthService } from '../auth/auth.service'
import { AuthServiceFake } from '../auth/auth.service.fake'
import { commonTestingModules, commonTestingProviders } from '../common/common.testing'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, LoginComponent],
      providers: commonTestingProviders,
      imports: commonTestingModules,
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
