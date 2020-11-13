import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { NavigationMenuComponent } from './navigation-menu.component'

describe('NavigationMenuComponent', () => {
  let component: NavigationMenuComponent
  let fixture: ComponentFixture<NavigationMenuComponent>

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NavigationMenuComponent],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationMenuComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
