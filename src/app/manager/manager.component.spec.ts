import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ManagerComponent } from './manager.component'
import { MaterialModule } from '../material.module'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { commonTestingProviders, commonTestingModules } from '../common/common.testing'
import { ManagerMaterialModule } from './manager.material.module'

describe('ManagerComponent', () => {
  let component: ManagerComponent
  let fixture: ComponentFixture<ManagerComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerComponent],
      providers: commonTestingProviders,
      imports: commonTestingModules.concat([ManagerMaterialModule]),
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
