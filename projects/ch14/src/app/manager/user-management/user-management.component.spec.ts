import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { commonTestingModules, commonTestingProviders } from '../../common/common.testing'
import { ManagerMaterialModule } from '../manager-material.module'
import { UserManagementComponent } from './user-management.component'

describe('UserManagementComponent', () => {
  let component: UserManagementComponent
  let fixture: ComponentFixture<UserManagementComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: commonTestingProviders,
        imports: commonTestingModules.concat([ManagerMaterialModule]),
        declarations: [UserManagementComponent],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
