import { Component, ViewChild } from '@angular/core'
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { LemonRaterComponent } from './lemon-rater.component'

@Component({
  template: '<app-lemon-rater [formControl]="rating"></app-lemon-rater>',
})
class TestHostComponent {
  @ViewChild(LemonRaterComponent, { static: true })
  public LemonRaterComponent!: LemonRaterComponent

  public rating: FormControl = new FormControl({ value: null, disabled: false })
}

describe('LemonRaterComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>
  let testHostComponent: TestHostComponent

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LemonRaterComponent, TestHostComponent],
        imports: [ReactiveFormsModule],
      }).compileComponents()
    })
  )

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent)
    testHostComponent = hostFixture.componentInstance
    hostFixture.detectChanges()
  })

  it('should create', () => {
    expect(testHostComponent.LemonRaterComponent).toBeTruthy()
  })

  it('should set the lemon rating based on the formControl value', () => {
    testHostComponent.rating.patchValue(3)
    hostFixture.detectChanges()
    expect(testHostComponent.LemonRaterComponent.value).toEqual(3)
    const compiled = hostFixture.debugElement.nativeElement
    const selected = compiled.querySelectorAll('app-lemon-rater .selected')
    expect(selected.length).toEqual(3)
  })

  it('should set disabled class when formControl is disabled', () => {
    testHostComponent.rating.disable()
    hostFixture.detectChanges()
    const compiled = hostFixture.debugElement.nativeElement
    const lemons = compiled.querySelector('app-lemon-rater .lemons')
    expect(lemons.classList.contains('disabled')).toBe(true)
  })

  it('should remove disabled class when formControl is enabled', () => {
    testHostComponent.rating.disable()
    hostFixture.detectChanges()
    const compiled = hostFixture.debugElement.nativeElement
    const lemons = compiled.querySelector('app-lemon-rater .lemons')
    expect(lemons.classList.contains('disabled')).toBe(true)
    testHostComponent.rating.enable()
    hostFixture.detectChanges()
    expect(lemons.classList.contains('disabled')).toBe(false)
  })

  it('should not call touch or change events when disabled', () => {
    testHostComponent.rating.patchValue(3)
    testHostComponent.rating.disable()
    hostFixture.detectChanges()
    const compiled = hostFixture.debugElement.nativeElement
    const lemon1 = compiled.querySelector('app-lemon-rater .lemons .lemon')
    lemon1.dispatchEvent(new Event('click'))
    hostFixture.detectChanges()
    expect(testHostComponent.rating.value).toBe(3)
  })

  it('should call touched when lemon selected', () => {
    const compiled = hostFixture.debugElement.nativeElement
    const lemon1 = compiled.querySelector('app-lemon-rater .lemons .lemon')
    lemon1.dispatchEvent(new Event('click'))
    hostFixture.detectChanges()
    expect(
      compiled.querySelector('app-lemon-rater').classList.contains('ng-touched')
    ).toBe(true)
  })

  it('should call change with rating value when lemon selected', () => {
    const compiled = hostFixture.debugElement.nativeElement
    const lemon3 = compiled.querySelectorAll('app-lemon-rater .lemons .lemon')[2]
    lemon3.dispatchEvent(new Event('click'))
    hostFixture.detectChanges()
    expect(testHostComponent.rating.value).toBe(3)
  })
})
