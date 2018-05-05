import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ViewUserComponent } from './view-user.component'
import { commonTestingProviders, commonTestingModules } from '../../common/common.testing'
import { MaterialModule } from '../../material.module'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { User } from '../user/user'

describe('ViewUserComponent', () => {
  let component: ViewUserComponent
  let fixture: ComponentFixture<ViewUserComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [],
      imports: [
        ReactiveFormsModule,
        FlexLayoutModule,
        MaterialModule,
        RouterTestingModule,
      ],
      declarations: [ViewUserComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
