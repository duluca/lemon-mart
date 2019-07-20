import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { BehaviorSubject, Observable, merge, of } from 'rxjs'
import {
  catchError,
  debounceTime,
  exhaustMap,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators'
import { UserEntityService } from 'src/app/user/user/user.entity.service'
import { SubSink } from 'subsink'

import { OptionalTextValidation } from '../../common/validations'
import { IUser, User } from '../../user/user/user'
import { IUsers, UserService } from '../../user/user/user.service'

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnDestroy, AfterViewInit {
  displayedColumns = ['name', 'email', 'role', 'status', 'id']
  dataSource = new MatTableDataSource()
  resultsLength = 0
  hasError = false
  errorText = ''
  private skipLoading = false
  private subs = new SubSink()
  useNgRxData = true
  readonly isLoadingResults$ = new BehaviorSubject(true)
  loading$: Observable<boolean>

  search = new FormControl('', OptionalTextValidation)

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator
  @ViewChild(MatSort, { static: false }) sort: MatSort

  constructor(
    private userService: UserService,
    private userEntityService: UserEntityService
  ) {
    this.loading$ = merge(this.userEntityService.loading$, this.isLoadingResults$)
  }

  add(user: User) {
    this.userEntityService.add(user)
  }

  delete(user: User) {
    this.userEntityService.delete(user.id)
  }

  getUsers(pageSize: number, searchText = '', pagesToSkip = 0): Observable<IUsers> {
    if (this.useNgRxData) {
      return this.userEntityService.getAll().pipe(
        map(value => {
          return { total: 0, items: value }
        })
      )
    }

    return this.userService.getUsers(pageSize, searchText, pagesToSkip)
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort

    this.subs.sink = this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0))

    if (this.skipLoading) {
      return
    }

    this.subs.add(
      merge(
        this.sort.sortChange,
        this.paginator.page,
        this.search.valueChanges.pipe(debounceTime(1000))
      )
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults$.next(true)
            return this.getUsers(
              this.paginator.pageSize,
              this.search.value,
              this.paginator.pageIndex
            )
          }),
          map((data: { total: number; items: IUser[] }) => {
            this.isLoadingResults$.next(false)
            this.hasError = false
            this.resultsLength = data.total

            return data.items
          }),
          catchError(err => {
            this.isLoadingResults$.next(false)
            this.hasError = true
            this.errorText = err
            return of([])
          })
        )
        .subscribe(data => (this.dataSource.data = data))
    )
  }
}
