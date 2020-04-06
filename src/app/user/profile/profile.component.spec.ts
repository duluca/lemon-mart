import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { createComponentMock } from 'angular-unit-test-helper'

import { commonTestingModules, commonTestingProviders } from '../../common/common.testing'
import { LemonRaterModule } from '../../user-controls/lemon-rater/lemon-rater.module'
import { UserMaterialModule } from '../user.material.module'
import { ProfileComponent } from './profile.component'

describe('ProfileComponent', () => {
  let component: ProfileComponent
  let fixture: ComponentFixture<ProfileComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: commonTestingProviders,
      imports: commonTestingModules.concat([UserMaterialModule, LemonRaterModule]),
      declarations: [
        ProfileComponent,
        createComponentMock('NameInputComponent'),
        createComponentMock('ViewUserComponent'),
      ],
    }).compileComponents()
    fixture = TestBed.createComponent(ProfileComponent)
    component = fixture.debugElement.componentInstance
  }))

  it('should create', () => {
    // fixture.detectChanges()
    expect(component).toBeTruthy()
  })
})
