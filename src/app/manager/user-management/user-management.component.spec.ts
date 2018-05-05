import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UserManagementComponent } from './user-management.component'
import { commonTestingProviders, commonTestingModules } from '../../common/common.testing'
import { ManagerMaterialModule } from '../manager.material.module'

describe('UserManagementComponent', () => {
  let component: UserManagementComponent
  let fixture: ComponentFixture<UserManagementComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: commonTestingProviders,
      imports: commonTestingModules.concat([ManagerMaterialModule]),
      declarations: [UserManagementComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
