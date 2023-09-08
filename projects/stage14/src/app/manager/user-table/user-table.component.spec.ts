import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { of } from 'rxjs'

import { commonTestingModules, commonTestingProviders } from '../../common/common.testing'
import { User } from '../../user/user/user'

import { UserTableComponent } from './user-table.component'

describe('UserTableComponent', () => {
  let component: UserTableComponent
  let fixture: ComponentFixture<UserTableComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: commonTestingProviders,
      imports: [
        ...commonTestingModules.concat([FormsModule, ManagerMaterialModule]),
        UserTableComponent,
      ],
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
