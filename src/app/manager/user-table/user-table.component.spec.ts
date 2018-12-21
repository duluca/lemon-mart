import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { MatTableDataSource } from '@angular/material'

import { commonTestingModules, commonTestingProviders } from '../../common/common.testing'
import { User } from '../../user/user/user'
import { ManagerMaterialModule } from '../manager.material.module'
import { UserTableComponent } from './user-table.component'

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
