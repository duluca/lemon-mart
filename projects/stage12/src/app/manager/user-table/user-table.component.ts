import { AsyncPipe } from '@angular/common'
import { AfterViewInit, Component, DestroyRef, inject, ViewChild } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterLink } from '@angular/router'
import { FlexModule } from '@ngbracket/ngx-layout/flex'
import { BehaviorSubject, merge, Observable, of, Subject } from 'rxjs'
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators'

import { OptionalTextValidation } from '../../common/validations'
import { IUser, User } from '../../user/user/user'
import { UserEntityService } from '../../user/user/user.entity.service'
import { IUsers, UserService } from '../../user/user/user.service'

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  standalone: true,
  imports: [
    AsyncPipe,
    FlexModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    RouterLink,
  ],
})
export class UserTableComponent implements AfterViewInit {
  displayedColumns = ['name', 'email', 'role', '_id']
  items$!: Observable<IUser[]>
  resultsLength = 0
  hasError = false
  errorText = ''
  private skipLoading = false
  private destroyRef = inject(DestroyRef)
  useNgRxData = false
  readonly isLoadingResults$ = new BehaviorSubject(true)
  loading$: Observable<boolean>
  refresh$ = new Subject<void>()

  search = new FormControl('', OptionalTextValidation)

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator
  @ViewChild(MatSort, { static: false }) sort!: MatSort

  constructor(
    private userService: UserService,
    private userEntityService: UserEntityService
  ) {
    this.loading$ = merge(this.userEntityService.loading$, this.isLoadingResults$)
    // this.loading$ = this.isLoadingResults$ //Pre-NgRx Data
  }

  getUsers(
    pageSize: number,
    searchText: string,
    pagesToSkip: number,
    sortColumn: string,
    sortDirection: SortDirection
  ): Observable<IUsers> {
    if (this.useNgRxData) {
      return this.userEntityService.getAll().pipe(
        map((value) => {
          return { total: value.length, data: value }
        })
      )
    } else {
      return this.userService.getUsers(
        pageSize,
        searchText,
        pagesToSkip,
        sortColumn,
        sortDirection
      )
    }
  }

  add(user: User) {
    this.userEntityService.add(user)
  }

  delete(user: User) {
    this.userEntityService.delete(user._id)
  }

  update(user: User) {
    this.userEntityService.update(user)
  }

  ngAfterViewInit() {
    this.sort.sortChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.paginator.firstPage())

    if (this.skipLoading) {
      return
    }

    this.items$ = merge(
      this.refresh$,
      this.sort.sortChange,
      this.paginator.page,
      this.search.valueChanges.pipe(debounceTime(1000))
    ).pipe(
      takeUntilDestroyed(this.destroyRef),
      startWith({}),
      switchMap(() => {
        this.isLoadingResults$.next(true)
        return this.getUsers(
          this.paginator.pageSize,
          this.search.value as string,
          this.paginator.pageIndex,
          this.sort.active,
          this.sort.direction
        )
      }),
      map((results: { total: number; data: IUser[] }) => {
        this.isLoadingResults$.next(false)
        this.hasError = false
        this.resultsLength = results.total

        return results.data
      }),
      catchError((err) => {
        this.isLoadingResults$.next(false)
        this.hasError = true
        this.errorText = err
        return of([])
      })
    )
    this.items$.subscribe()
  }
}
