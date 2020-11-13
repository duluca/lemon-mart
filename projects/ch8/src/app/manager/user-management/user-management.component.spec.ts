import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { UserManagementComponent } from './user-management.component'

describe('UserManagementComponent', () => {
  let component: UserManagementComponent
  let fixture: ComponentFixture<UserManagementComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
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
