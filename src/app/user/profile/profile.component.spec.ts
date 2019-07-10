import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { SharedComponentsModule } from 'src/app/shared-components.module'

import { commonTestingModules, commonTestingProviders } from '../../common/common.testing'
import { UserMaterialModule } from '../user.material.module'
import { ProfileComponent } from './profile.component'

describe('ProfileComponent', () => {
  let component: ProfileComponent
  let fixture: ComponentFixture<ProfileComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: commonTestingProviders,
      imports: commonTestingModules.concat([UserMaterialModule, SharedComponentsModule]),
      declarations: [ProfileComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
