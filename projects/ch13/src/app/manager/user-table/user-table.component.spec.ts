import { ComponentFixture, TestBed, async } from '@angular/core/testing'
import { commonTestingModules, commonTestingProviders } from '../../common/common.testing'

import { EffectsModule } from '@ngrx/effects'
import { FormsModule } from '@angular/forms'
import { ManagerMaterialModule } from '../manager-material.module'
import { User } from '../../user/user/user'
import { UserTableComponent } from './user-table.component'
import { of } from 'rxjs'

describe('UserTableComponent', () => {
  let component: UserTableComponent
  let fixture: ComponentFixture<UserTableComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserTableComponent],
      providers: commonTestingProviders,
      imports: commonTestingModules.concat([FormsModule, ManagerMaterialModule]),
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTableComponent)
    component = fixture.componentInstance
    component.items$ = of([new User()])
    Object.assign(component, { skipLoading: true })
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
