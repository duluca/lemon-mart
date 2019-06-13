import { Component, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { BehaviorSubject, Observable, Subject, pipe } from 'rxjs'
import { map, startWith, take, tap } from 'rxjs/operators'
import { $enum } from 'ts-enum-util'

import { AuthService } from '../../auth/auth.service'
import { Role as UserRole } from '../../auth/role.enum'
import {
  BirthDateValidation,
  EmailValidation,
  OneCharValidation,
  OptionalTextValidation,
  RequiredTextValidation,
  USAPhoneNumberValidation,
  USAZipCodeValidation,
} from '../../common/validations'
import { IName, IPhone, IUser } from '../user/user'
import { UserService } from '../user/user.service'
import { IUSState, PhoneType, USStateFilter } from './data'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  Role = UserRole
  PhoneTypes = $enum(PhoneType).getKeys()
  userForm: FormGroup
  states$: Observable<IUSState[]>
  userError = ''
  name$: BehaviorSubject<IName> = new BehaviorSubject({ first: '', middle: '', last: '' })

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.authStatus$.pipe(take(1)).subscribe(authStatus => {
      this.tryBuildFromCache(authStatus.userRole)
    })
  }

  tryBuildFromCache(currentUserRole: UserRole) {
    // for demo purposes only
    const draftUser = JSON.parse(localStorage.getItem('draft-user'))

    if (!draftUser) {
      // the if condition is for demo purposes only
      this.userService.getCurrentUser().subscribe(user => {
        this.buildUserForm(user, currentUserRole)
      })
    }

    // draftUser is being passed in for demo purposes only
    this.buildUserForm(draftUser, currentUserRole)
  }

  buildUserForm(user?: IUser, currentUserRole = UserRole.None) {
    // this.name$.subscribe(value => this.name.patchValue(value, { onlySelf: false }))
    if (user) {
      this.name$.next(user.name)
    }

    this.userForm = this.formBuilder.group({
      email: [
        {
          value: (user && user.email) || '',
          disabled: currentUserRole !== this.Role.Manager,
        },
        EmailValidation,
      ],
      name: this.formBuilder.group({
        first: [(user && user.name.first) || '', RequiredTextValidation],
        middle: [(user && user.name.middle) || '', OneCharValidation],
        last: [(user && user.name.last) || '', RequiredTextValidation],
      }),
      role: [
        {
          value: (user && user.role) || '',
          disabled: currentUserRole !== this.Role.Manager,
        },
        [Validators.required],
      ],
      dateOfBirth: [(user && user.dateOfBirth) || '', BirthDateValidation],
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
      phones: this.formBuilder.array(this.buildPhoneArray(user ? user.phones : [])),
    })

    this.states$ = this.userForm
      .get('address')
      .get('state')
      .valueChanges.pipe(
        startWith(''),
        map(value => USStateFilter(value))
      )
  }

  addPhone() {
    this.phonesArray.push(this.buildPhoneFormControl(this.phonesArray.value.length + 1))
  }

  get phonesArray(): FormArray {
    return this.userForm.get('phones') as FormArray
  }

  get name(): FormGroup {
    return this.userForm.get('name') as FormGroup
  }

  private buildPhoneArray(phones: IPhone[]) {
    const groups = []

    if (!phones || (phones && phones.length === 0)) {
      groups.push(this.buildPhoneFormControl(1))
    } else {
      phones.forEach(p => {
        groups.push(this.buildPhoneFormControl(p.id, p.type, p.number))
      })
    }
    return groups
  }

  private buildPhoneFormControl(id, type?: string, phoneNumber?: string) {
    return this.formBuilder.group({
      id: [id],
      type: [type || '', Validators.required],
      number: [phoneNumber || '', USAPhoneNumberValidation],
    })
  }

  get dateOfBirth() {
    return this.userForm.get('dateOfBirth').value || new Date()
  }

  get age() {
    return new Date().getFullYear() - this.dateOfBirth.getFullYear()
  }

  async save(form: FormGroup) {
    this.userService
      .updateUser(form.value)
      .subscribe(res => this.buildUserForm(res), err => (this.userError = err))
  }
}
