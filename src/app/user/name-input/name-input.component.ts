import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { BaseFormComponent } from 'src/app/common/base-form.class'

import { OptionalTextValidation, RequiredTextValidation } from '../../common/validations'
import { IName } from '../user/user'

@Component({
  selector: 'app-name-input',
  template: `
    <form [formGroup]="formGroup">
      <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="10px">
        <mat-form-field appearance="outline" fxFlex="40%">
          <mat-label>First Name</mat-label>
          <input matInput aria-label="First Name" formControlName="first" required />
          <mat-error *ngIf="formGroup.get('first').hasError('required')">
            First Name is required
          </mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline" fxFlex="20%">
          <mat-label>MI</mat-label>
          <input matInput aria-label="Middle" formControlName="middle" />
        </mat-form-field>
        <mat-form-field appearance="outline" fxFlex="40%">
          <mat-label>Last Name</mat-label>
          <input matInput aria-label="Last Name" formControlName="last" required />
          <mat-error *ngIf="formGroup.get('last').hasError('required')">
            Last Name is required
          </mat-error>
        </mat-form-field>
      </div>
    </form>
  `,
  styles: [],
})
export class NameInputComponent extends BaseFormComponent<IName>
  implements OnInit, OnChanges {
  @Input() disable: boolean

  formGroup: FormGroup

  constructor(private formBuilder: FormBuilder) {
    super()
  }

  ngOnInit() {
    this.formGroup = this.buildForm(this.initialData)
    this.formReady.emit(this.formGroup)
    if (this.disable) {
      this.formGroup.disable()
    }
  }

  buildForm(initialData?: IName): FormGroup {
    const name = initialData
    return this.formBuilder.group({
      first: [name ? name.first : '', RequiredTextValidation],
      middle: [name ? name.middle : '', OptionalTextValidation],
      last: [name ? name.last : '', RequiredTextValidation],
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.formGroup && this.hasChanged(changes.initialData)) {
      this.formGroup.patchValue(this.initialData, { onlySelf: false })
    }
  }

  private hasChanged(change: SimpleChange): boolean {
    return change && change.previousValue !== change.currentValue
  }
}
