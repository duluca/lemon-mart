import { AsyncPipe } from '@angular/common'
import { Component, DestroyRef, inject, OnInit } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatButtonModule } from '@angular/material/button'
import { MatOptionModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatRadioModule } from '@angular/material/radio'
import { MatSelectModule } from '@angular/material/select'
import { MatStepperModule } from '@angular/material/stepper'
import { MatToolbarModule } from '@angular/material/toolbar'
import { FlexModule } from '@ngbracket/ngx-layout/flex'
import { NgxMaskDirective } from 'ngx-mask'
import { Observable } from 'rxjs'
import { filter, first, map, startWith, tap } from 'rxjs/operators'
import { $enum } from 'ts-enum-util'

import { Role } from '../../auth/auth.enum'
import { AuthService } from '../../auth/auth.service'
import { UiService } from '../../common/ui.service'
import {
  EmailValidation,
  OneCharValidation,
  OptionalTextValidation,
  RequiredTextValidation,
  USAPhoneNumberValidation,
  USAZipCodeValidation,
} from '../../common/validations'
import {
  ErrorSets,
  FieldErrorDirective,
} from '../../user-controls/field-error/field-error.directive'
import { LemonRaterComponent } from '../../user-controls/lemon-rater/lemon-rater.component'
import { NameInputComponent } from '../name-input/name-input.component'
import { IPhone, IUser, PhoneType } from '../user/user'
import { UserService } from '../user/user.service'
import { ViewUserComponent } from '../view-user/view-user.component'
import { IUSState, USStateFilter } from './data'

@Component({
  selector: 'app-profile-initial',
  templateUrl: './profile.initial.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatStepperModule,
    ReactiveFormsModule,
    NameInputComponent,
    FlexModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FieldErrorDirective,
    MatRadioModule,
    LemonRaterComponent,
    MatButtonModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    NgxMaskDirective,
    ViewUserComponent,
    AsyncPipe,
  ],
})
export class ProfileInitialComponent implements OnInit {
  Role = Role
  PhoneType = PhoneType
  PhoneTypes = $enum(PhoneType).getKeys()
  formGroup!: FormGroup
  states$!: Observable<IUSState[]>
  userError = ''
  ErrorSets = ErrorSets
  currentUserId!: string

  now = new Date()
  minDate = new Date(
    this.now.getFullYear() - 100,
    this.now.getMonth(),
    this.now.getDate()
  )

  get dateOfBirth() {
    return this.formGroup.get('dateOfBirth')?.value || this.now
  }

  get age() {
    return this.now.getFullYear() - this.dateOfBirth.getFullYear()
  }

  get phonesArray(): FormArray {
    return this.formGroup.get('phones') as FormArray
  }

  private readonly destroyRef = inject(DestroyRef)

  constructor(
    private formBuilder: FormBuilder,
    private uiService: UiService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.buildForm()
    this.authService.currentUser$
      .pipe(
        filter((user) => user !== null),
        tap((user) => {
          this.currentUserId = user._id
          this.buildForm(user)
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe()
  }

  private get currentUserRole() {
    return this.authService.authStatus$.value.userRole
  }

  buildForm(user?: IUser) {
    this.formGroup = this.formBuilder.group({
      email: [
        {
          value: (user && user.email) || '',
          disabled: this.currentUserRole !== Role.Manager,
        },
        EmailValidation,
      ],
      name: this.formBuilder.group({
        first: [user?.name?.first || '', RequiredTextValidation],
        middle: [user?.name?.middle || '', OneCharValidation],
        last: [user?.name?.last || '', RequiredTextValidation],
      }),
      role: [
        {
          value: (user && user.role) || '',
          disabled: this.currentUserRole !== Role.Manager,
        },
        Validators.required,
      ],
      dateOfBirth: [(user && user.dateOfBirth) || '', Validators.required],
      address: this.formBuilder.group({
        line1: [
          (user && user.address && user.address.line1) || '',
          RequiredTextValidation,
        ],
        line2: [
          (user && user.address && user.address.line2) || '',
          OptionalTextValidation,
        ],
        city: [(user && user.address && user.address.city) || '', RequiredTextValidation],
        state: [
          (user && user.address && user.address.state) || '',
          RequiredTextValidation,
        ],
        zip: [(user && user.address && user.address.zip) || '', USAZipCodeValidation],
      }),
      phones: this.formBuilder.array(this.buildPhoneArray(user?.phones || [])),
    })

    const state = this.formGroup.get('address.state')

    if (state != null) {
      this.states$ = state.valueChanges.pipe(
        startWith(''),
        map((value) => USStateFilter(value as string))
      )
    }
  }

  addPhone() {
    this.phonesArray.push(this.buildPhoneFormControl(this.phonesArray.value.length + 1))
  }

  private buildPhoneArray(phones: IPhone[]) {
    const groups: FormGroup[] = []

    if (phones?.length === 0) {
      groups.push(this.buildPhoneFormControl(1))
    } else {
      phones.forEach((p) => {
        groups.push(this.buildPhoneFormControl(p.id, p.type, p.digits))
      })
    }
    return groups
  }

  private buildPhoneFormControl(
    id: number,
    type?: string,
    phoneNumber?: string
  ): FormGroup {
    return this.formBuilder.group({
      id: [id],
      type: [type || '', Validators.required],
      digits: [phoneNumber || '', USAPhoneNumberValidation],
    })
  }

  async save(form: FormGroup) {
    this.userService
      .updateUser(this.currentUserId, form.value)
      .pipe(first())
      .subscribe({
        next: (res: IUser) => {
          this.formGroup.patchValue(res)
          this.uiService.showToast('Updated user')
        },
        error: (err: string) => (this.userError = err),
      })
  }

  convertTypeToPhoneType(type: string): PhoneType {
    return PhoneType[$enum(PhoneType).asKeyOrThrow(type)]
  }
}
