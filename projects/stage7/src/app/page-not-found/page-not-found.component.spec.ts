import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { PageNotFoundComponent } from './page-not-found.component'
import { RouterTestingModule } from '@angular/router/testing'

describe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent
  let fixture: ComponentFixture<PageNotFoundComponent>

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PageNotFoundComponent, RouterTestingModule],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
