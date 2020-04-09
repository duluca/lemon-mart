import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

import { BaseFormComponent } from '../../common/base-form.class'
import { OneCharValidation, RequiredTextValidation } from '../../common/validations'
import { IName } from '../user/user'

@Component({
  selector: 'app-name-input',
  // prettier-ignore
  template: `
    <form [formGroup]="formGroup">
      <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="10px">
        <mat-form-field appearance="outline" fxFlex="40%">
          <mat-label>First Name</mat-label>
          <input matInput aria-label="First Name" formControlName="first" />
          <mat-error *ngIf="formGroup.get('first').hasError('required')">
            First Name is required
          </mat-error>
          <mat-error *ngIf="formGroup.get('first').hasError('minLength')">
            Must be at least 2 characters
          </mat-error>
          <mat-error *ngIf="formGroup.get('first').hasError('maxLength')">
            Can't exceed 50 characters
          </mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline" fxFlex="20%">
          <mat-label>MI</mat-label>
          <input matInput aria-label="Middle Initial" formControlName="middle" />
          <mat-error *ngIf="formGroup.get('middle').invalid">
            Only inital
          </mat-error>
        </mat-form-field>
        <mat-form-field appearance="outline" fxFlex="40%">
          <mat-label>Last Name</mat-label>
          <input matInput aria-label="Last Name" formControlName="last" />
          <mat-error *ngIf="formGroup.get('last').hasError('required')">
            Last Name is required
          </mat-error>
          <mat-error *ngIf="formGroup.get('last').hasError('minLength')">
            Must be at least 2 characters
          </mat-error>
          <mat-error *ngIf="formGroup.get('last').hasError('maxLength')">
            Can't exceed 50 characters
          </mat-error>
        </mat-form-field>
      </div>
    </form>
  `,
  styles: [],
})
export class NameInputComponent extends BaseFormComponent<IName>
  implements OnInit, OnChanges {
  constructor(private formBuilder: FormBuilder) {
    super()
  }

  ngOnInit() {
    this.formGroup = this.buildForm(this.initialData)

    if (this.disable) {
      this.formGroup.disable()
    }

    this.formReady.emit(this.formGroup)
  }

  buildForm(initialData?: IName): FormGroup {
    const name = initialData
    return this.formBuilder.group({
      first: [name?.first || '', RequiredTextValidation],
      middle: [name?.middle || '', OneCharValidation],
      last: [name?.last || '', RequiredTextValidation],
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.patchUpdatedDataIfChanged(changes)
  }
}
