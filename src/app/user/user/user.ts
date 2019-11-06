import { Role } from '../../auth/role.enum'

export interface IName {
  first: string
  middle?: string
  last: string
}

export interface IUser {
  _id: string
  email: string
  name: IName
  picture: string
  role: Role
  userStatus: boolean
  dateOfBirth: Date
  address: {
    line1: string
    line2: string
    city: string
    state: string
    zip: string
  }
  phones: IPhone[]
}

export interface IPhone {
  type: string
  digits: string
  id: number
}

export class User implements IUser {
  constructor(
    // tslint:disable-next-line: variable-name
    public _id = '',
    public email = '',
    public name = { first: '', middle: '', last: '' } as IName,
    public picture = '',
    public role = Role.None,
    public dateOfBirth = null,
    public userStatus = false,
    public address = {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
    },
    public phones = []
  ) {}

  static Build(user: IUser) {
    if (!user) {
      return new User()
    }

    return new User(
      user._id,
      user.email,
      user.name,
      user.picture,
      user.role,
      user.dateOfBirth,
      user.userStatus,
      user.address,
      user.phones
    )
  }

  public get fullName(): string {
    if (this.name.middle) {
      return `${this.name.first} ${this.name.middle} ${this.name.last}`
    }
    return `${this.name.first} ${this.name.last}`
  }
}
