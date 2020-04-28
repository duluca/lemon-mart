import { FormGroup } from '@angular/forms'

import { BaseFormComponent } from './base-form.class'

interface ITestData {
  name: string
}

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
