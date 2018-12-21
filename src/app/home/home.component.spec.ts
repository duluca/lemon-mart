import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'

import { AuthService } from '../auth/auth.service'
import { AuthServiceFake } from '../auth/auth.service.fake'
import { commonTestingModules, commonTestingProviders } from '../common/common.testing'
import { LoginComponent } from '../login/login.component'
import { MaterialModule } from '../material.module'
import { HomeComponent } from './home.component'

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
