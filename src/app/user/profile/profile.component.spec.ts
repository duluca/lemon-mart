import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ProfileComponent } from './profile.component'
import { commonTestingProviders, commonTestingModules } from '../../common/common.testing'
import { UserMaterialModule } from '../user.material.module'

describe('ProfileComponent', () => {
  let component: ProfileComponent
  let fixture: ComponentFixture<ProfileComponent>

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        providers: commonTestingProviders,
        imports: commonTestingModules.concat([UserMaterialModule]),
        declarations: [ProfileComponent],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent)
    component = fixture.componentInstance
    //component.
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
