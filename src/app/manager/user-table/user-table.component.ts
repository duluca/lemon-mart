import { AsyncPipe, NgIf } from '@angular/common'
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core'
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
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  take,
} from 'rxjs/operators'
import { $D } from 'rxjs-debug'
import { SubSink } from 'subsink'

import { OptionalTextValidation } from '../../common/validations'
import { IUser } from '../../user/user/user'
import { UserEntityService } from '../../user/user/user.entity.service'
import { IUsers, UserService } from '../../user/user/user.service'

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  standalone: true,
  imports: [
    MatSlideToggleModule,
    ReactiveFormsModule,
    FormsModule,
    FlexModule,
    MatFormFieldModule,
    MatIconModule,
    // MatButtonModule,
    MatInputModule,
    NgIf,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    RouterLink,
    MatToolbarModule,
    MatPaginatorModule,
    AsyncPipe,
  ],
})
export class UserTableComponent implements OnDestroy, AfterViewInit {
  displayedColumns = ['name', 'email', 'role', '_id']
  items$!: Observable<IUser[]>
  resultsLength = 0
  hasError = false
  errorText = ''
  private skipLoading = false
  private subs = new SubSink()
  useNgRxData = false
  readonly isLoadingResults$ = new BehaviorSubject(true)
  loading$: Observable<boolean>
  refresh$ = new Subject<void>()

  search = new FormControl<string>('', OptionalTextValidation)

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator
  @ViewChild(MatSort, { static: true }) sort!: MatSort

  constructor(
    private userService: UserService,
    private userEntityService: UserEntityService
  ) {
    this.loading$ = merge(this.userEntityService.loading$, this.isLoadingResults$)
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

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngAfterViewInit() {
    this.subs.sink = this.sort.sortChange.subscribe(() => this.paginator.firstPage())

    if (this.skipLoading) {
      return
    }

    this.items$ = merge(
      this.refresh$,
      this.sort.sortChange,
      this.paginator.page,
      this.search.valueChanges.pipe(debounceTime(1000))
    ).pipe(
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
        console.log(results)
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
