import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs'
import { filter, map, startWith, tap } from 'rxjs/operators'
import { SubSink } from 'subsink'
import { $enum } from 'ts-enum-util'

import { Role } from '../../auth/auth.enum'
import { AuthService } from '../../auth/auth.service'
import { BaseFormDirective } from '../../common/base-form.class'
import { UiService } from '../../common/ui.service'
import {
  EmailValidation,
  OptionalTextValidation,
  RequiredTextValidation,
  USAPhoneNumberValidation,
  USAZipCodeValidation,
} from '../../common/validations'
import { ErrorSets } from '../../user-controls/field-error/field-error.directive'
import { IName, IPhone, IUser, PhoneType, User } from '../user/user'
import { UserService } from '../user/user.service'
import { IUSState, USStateFilter } from './data'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent
  extends BaseFormDirective<IUser>
  implements OnInit, OnDestroy
{
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

  private subs = new SubSink()

  currentUserId!: string

  ngOnInit() {
    this.formGroup = this.buildForm()

    this.subs.sink = combineLatest([this.loadFromCache(), this.authService.currentUser$])
      .pipe(
        filter(([cachedUser, me]) => cachedUser != null || me != null),
        tap(([cachedUser, me]) => this.patchUser(cachedUser || me))
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
    this.subs.unsubscribe()
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
        [Validators.required],
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
      map((value) => USStateFilter(value))
    )

    return form
  }

  addPhone() {
    this.phonesArray.push(this.buildPhoneFormControl(this.phonesArray.value.length + 1))
  }

  private buildPhoneArray(phones: IPhone[]) {
    const groups = []

    if (phones?.length === 0) {
      groups.push(this.buildPhoneFormControl(1))
    } else {
      phones.forEach((p) => {
        groups.push(this.buildPhoneFormControl(p.id, p.type, p.digits))
      })
    }
    return groups
  }

  private buildPhoneFormControl(id: number, type?: string, phoneNumber?: string) {
    return this.formBuilder.group({
      id: [id],
      type: [type || '', Validators.required],
      digits: [phoneNumber || '', USAPhoneNumberValidation],
    })
  }

  async save(form: FormGroup) {
    this.subs.add(
      this.userService.updateUser(this.currentUserId, form.value).subscribe(
        (res: IUser) => {
          this.patchUser(res)
          this.uiService.showToast('Updated user')
        },
        (err: string) => (this.userError = err)
      )
    )
  }

  convertTypeToPhoneType(type: string): PhoneType {
    return PhoneType[$enum(PhoneType).asKeyOrThrow(type)]
  }

  private loadFromCache(): Observable<User | null> {
    let user = null

    try {
      const draftUser = localStorage.getItem('draft-user')

      if (draftUser != null) {
        user = User.Build(JSON.parse(draftUser))
      }

      if (user) {
        this.uiService.showToast('Loaded data from cache')
      }
    } catch (err) {
      localStorage.removeItem('draft-user')
    }

    return of(user)
  }

  clearCache() {
    localStorage.removeItem('draft-user')
  }
}
