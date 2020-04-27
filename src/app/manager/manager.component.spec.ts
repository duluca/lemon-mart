import { ComponentFixture, TestBed, async } from '@angular/core/testing'

import { commonTestingModules, commonTestingProviders } from '../common/common.testing'
import { ManagerMaterialModule } from './manager-material.module'
import { ManagerComponent } from './manager.component'

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
