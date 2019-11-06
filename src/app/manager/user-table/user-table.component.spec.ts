import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { MatTableDataSource } from '@angular/material'
import { EntityDataModule, EntityDataModuleWithoutEffects } from '@ngrx/data'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'

import { commonTestingModules, commonTestingProviders } from '../../common/common.testing'
import { entityConfig } from '../../entity-metadata'
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
      imports: commonTestingModules.concat([
        ManagerMaterialModule,
        EntityDataModule.forRoot(entityConfig),
        EffectsModule.forRoot([]),
        StoreModule.forRoot({}),
      ]),
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTableComponent)
    component = fixture.componentInstance
    component.items = [new User()]
    Object.assign(component, { skipLoading: true })
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
