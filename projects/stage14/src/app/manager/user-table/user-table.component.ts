import { AsyncPipe, NgIf } from '@angular/common'
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core'
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterLink } from '@angular/router'
import { FlexModule } from '@ngbracket/ngx-layout/flex'
import { BehaviorSubject, merge, Observable, of, Subject } from 'rxjs'
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators'
import { SubSink } from 'subsink'

import { OptionalTextValidation } from '../../common/validations'
import { IUser } from '../../user/user/user'
import { IUsers, UserService } from '../../user/user/user.service'

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FlexModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgIf,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
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
  readonly isLoadingResults$ = new BehaviorSubject(true)
  loading$: Observable<boolean>
  refresh$ = new Subject<void>()

  search = new FormControl('', OptionalTextValidation)

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator
  @ViewChild(MatSort, { static: false }) sort!: MatSort

  constructor(private userService: UserService) {
    this.loading$ = this.isLoadingResults$
  }

  getUsers(
    pageSize: number,
    searchText: string,
    pagesToSkip: number,
    sortColumn: string,
    sortDirection: SortDirection
  ): Observable<IUsers> {
    return this.userService.getUsers(
      pageSize,
      searchText,
      pagesToSkip,
      sortColumn,
      sortDirection
    )
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
