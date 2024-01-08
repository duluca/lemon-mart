import { AsyncPipe } from '@angular/common'
import { Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core'
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
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core'
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
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs'
import { filter, first, map, startWith, tap } from 'rxjs/operators'
import { $enum } from 'ts-enum-util'

import { Role } from '../../auth/auth.enum'
import { AuthService } from '../../auth/auth.service'
import { BaseFormDirective } from '../../common/base-form.class'
import { CacheService } from '../../common/cache.service'
import { UiService } from '../../common/ui.service'
import {
  EmailValidation,
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
import { IName, IPhone, IUser, PhoneType, User } from '../user/user'
import { UserService } from '../user/user.service'
import { ViewUserComponent } from '../view-user/view-user.component'
import { IUSState, USStateFilter } from './data'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
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
    MatNativeDateModule,
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
export class ProfileComponent
  extends BaseFormDirective<IUser>
  implements OnInit, OnDestroy
{
  private readonly cache = inject(CacheService)

  private get currentUserRole() {
    return this.authService.authStatus$.value.userRole
  }

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private uiService: UiService
  ) {
    super()
  }

  get phonesArray(): FormArray {
    return this.formGroup.get('phones') as FormArray
  }

  get dateOfBirth() {
    return this.formGroup.get('dateOfBirth')?.value || this.now
  }

  get age() {
    return this.now.getFullYear() - this.dateOfBirth.getFullYear()
  }
  ErrorSets = ErrorSets
  Role = Role
  PhoneTypes = $enum(PhoneType).getKeys()

  now = new Date()
  minDate = new Date(
    this.now.getFullYear() - 100,
    this.now.getMonth(),
    this.now.getDate()
  )

  states$: Observable<IUSState[]> | undefined
  userError = ''
  readonly nameInitialData$ = new BehaviorSubject<IName>({
    first: '',
    middle: '',
    last: '',
  })

  private readonly destroyRef = inject(DestroyRef)

  currentUserId!: string

  ngOnInit() {
    this.formGroup = this.buildForm()

    combineLatest([this.loadFromCache(), this.authService.currentUser$])
      .pipe(
        filter(([cachedUser, me]) => cachedUser != null || me != null),
        tap(([cachedUser, me]) => this.patchUser(cachedUser || me)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe()
  }

  patchUser(user: IUser) {
    if (user) {
      this.currentUserId = user._id
      this.patchUpdatedData(user)
      this.nameInitialData$.next(user.name)
    }
  }

  ngOnDestroy() {
    this.deregisterAllForms()
  }

  buildForm(initialData?: IUser): FormGroup {
    const user = initialData
    this.currentUserId = user?._id || ''
    const form = this.formBuilder.group({
      email: [
        {
          value: user?.email || '',
          disabled: this.currentUserRole !== Role.Manager,
        },
        EmailValidation,
      ],
      name: null,
      role: [
        {
          value: user?.role || '',
          disabled: this.currentUserRole !== Role.Manager,
        },
        Validators.required,
      ],
      level: [user?.level || 0, Validators.required],
      // use the code below to test disabled condition of <app-lemon-rater>
      // level: [{ value: 2, disabled: true }, [Validators.required]],
      dateOfBirth: [user?.dateOfBirth || '', Validators.required],
      address: this.formBuilder.group({
        line1: [user?.address?.line1 || '', RequiredTextValidation],
        line2: [user?.address?.line2 || '', OptionalTextValidation],
        city: [user?.address?.city || '', RequiredTextValidation],
        state: [user?.address?.state || '', RequiredTextValidation],
        zip: [user?.address?.zip || '', USAZipCodeValidation],
      }),
      phones: this.formBuilder.array(this.buildPhoneArray(user?.phones || [])),
    })

    this.states$ = form.get('address.state')?.valueChanges.pipe(
      startWith(''),
      map((value) => USStateFilter(value as string))
    )

    return form
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
          this.patchUser(res)
          this.uiService.showToast('Updated user')
        },
        error: (err: string) => (this.userError = err),
      })
  }

  convertTypeToPhoneType(type: string): PhoneType {
    return PhoneType[$enum(PhoneType).asKeyOrThrow(type)]
  }

  private loadFromCache(): Observable<User | null> {
    let user: User | null = null
    try {
      user = this.cache.getItem<User>('draft-user', User.Build)
      if (user) {
        this.uiService.showToast('Loaded data from cache')
      }
    } catch (err) {
      this.clearCache()
    }
    return of(user)
  }

  clearCache() {
    this.cache.removeItem('draft-user')
  }
}
