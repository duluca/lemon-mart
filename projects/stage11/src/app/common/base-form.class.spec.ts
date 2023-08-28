import { Directive } from '@angular/core'
import { FormGroup } from '@angular/forms'

import { BaseFormDirective } from './base-form.class'

interface ITestData {
  name: string
}

@Directive()
class TestFormDirective extends BaseFormDirective<ITestData> {
  buildForm(): FormGroup {
    return jasmine.createSpyObj('form', [])
  }
}

describe('BaseFormDirective', () => {
  it('should create an instance', () => {
    expect(new TestFormDirective()).toBeTruthy()
  })
})
