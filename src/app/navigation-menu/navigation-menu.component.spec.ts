import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { NavigationMenuComponent } from './navigation-menu.component'
import { commonTestingModules } from '../common/common.testing'

describe('NavigationMenuComponent', () => {
  let component: NavigationMenuComponent
  let fixture: ComponentFixture<NavigationMenuComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: commonTestingModules,
      declarations: [NavigationMenuComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationMenuComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
