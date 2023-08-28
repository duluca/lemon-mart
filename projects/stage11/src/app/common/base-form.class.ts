import {
  Directive,
  EventEmitter,
  Input,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core'
import { AbstractControl, FormGroup } from '@angular/forms'

@Directive()
export abstract class BaseFormDirective<TFormData extends object> {
  @Input() initialData!: TFormData | null
  @Input() disable!: boolean
  @Output() formReady: EventEmitter<AbstractControl>
  formGroup!: FormGroup

  private registeredForms: string[] = []

  constructor() {
    this.formReady = new EventEmitter<AbstractControl>(true)
  }

  abstract buildForm(initialData?: TFormData | null): FormGroup

  patchUpdatedData(data: object | null) {
    if (data) {
      this.formGroup.patchValue(data, { onlySelf: false })
    }
  }

  patchUpdatedDataIfChanged(changes: SimpleChanges) {
    if (this.formGroup && this.hasChanged(changes.initialData)) {
      this.patchUpdatedData(this.initialData)
    }
  }

  emitFormReady(control: AbstractControl | null = null) {
    this.formReady.emit(control || this.formGroup)
  }

  registerForm(name: string, control: AbstractControl) {
    this.formGroup.setControl(name, control)
    this.registeredForms.push(name)
  }

  deregisterForm(name: string) {
    if (this.formGroup.contains(name)) {
      this.formGroup.removeControl(name)
    }
  }

  protected deregisterAllForms() {
    this.registeredForms.forEach((name) => this.deregisterForm(name))
  }

  protected hasChanged(change: SimpleChange): boolean {
    return change?.previousValue !== change?.currentValue
  }
}
