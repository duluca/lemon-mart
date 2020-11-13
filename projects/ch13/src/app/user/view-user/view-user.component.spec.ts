import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { FlexLayoutModule } from '@angular/flex-layout'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'

import { AppMaterialModule } from '../../app-material.module'
import { ViewUserComponent } from './view-user.component'

describe('ViewUserComponent', () => {
  let component: ViewUserComponent
  let fixture: ComponentFixture<ViewUserComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [],
        imports: [
          ReactiveFormsModule,
          FlexLayoutModule,
          AppMaterialModule,
          RouterTestingModule,
        ],
        declarations: [ViewUserComponent],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUserComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
