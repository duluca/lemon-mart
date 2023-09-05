import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { commonTestingModules, commonTestingProviders } from '../common/common.testing'
import { ManagerComponent } from './manager.component'
import { ManagerMaterialModule } from './manager-material.module'

describe('ManagerComponent', () => {
  let component: ManagerComponent
  let fixture: ComponentFixture<ManagerComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: commonTestingProviders,
      imports: [
        ...commonTestingModules.concat([ManagerMaterialModule]),
        ManagerComponent,
      ],
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
