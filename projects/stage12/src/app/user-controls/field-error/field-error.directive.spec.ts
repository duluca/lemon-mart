import { ElementRef } from '@angular/core'
import { autoSpyObj } from 'angular-unit-test-helper'

import { FieldErrorDirective } from './field-error.directive'

describe('FormErrorDirective', () => {
  it('should create an instance', () => {
    const directive = new FieldErrorDirective(autoSpyObj(ElementRef))
    expect(directive).toBeTruthy()
  })
})
