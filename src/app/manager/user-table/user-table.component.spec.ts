import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UserTableComponent } from './user-table.component'
import { commonTestingProviders, commonTestingModules } from '../../common/common.testing'
import { ManagerMaterialModule } from '../manager.material.module'
import { MatTableDataSource } from '@angular/material'
import { User } from '../../user/user/user'

describe('UserTableComponent', () => {
  let component: UserTableComponent
  let fixture: ComponentFixture<UserTableComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserTableComponent],
      providers: commonTestingProviders,
      imports: commonTestingModules.concat([ManagerMaterialModule]),
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTableComponent)
    component = fixture.componentInstance
    component.dataSource = new MatTableDataSource()
    component.dataSource.data = [new User()]
    component._skipLoading = true
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
