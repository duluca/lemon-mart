import { ElementRef } from '@angular/core'
import { autoSpyObj } from 'angular-unit-test-helper'

import { FormErrorDirective } from './form-error.directive'

describe('FormErrorDirective', () => {
  it('should create an instance', () => {
    const directive = new FormErrorDirective(autoSpyObj(ElementRef))
    expect(directive).toBeTruthy()
  })
})
