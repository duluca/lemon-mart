import { FormGroup } from '@angular/forms'

import { BaseFormComponent } from './base-form.class'
import { Directive } from "@angular/core";

interface ITestData {
  name: string
}

@Directive()
class TestFormComponent extends BaseFormComponent<ITestData> {
  buildForm(): FormGroup {
    return jasmine.createSpyObj('form', [])
  }
}

describe('BaseFormComponent', () => {
  it('should create an instance', () => {
    expect(new TestFormComponent()).toBeTruthy()
  })
})
