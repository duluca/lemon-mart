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
import { MatSort, MatSortModule } from '@angular/material/sort'
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterLink } from '@angular/router'
import { FlexModule } from '@ngbracket/ngx-layout/flex'
import { BehaviorSubject, merge, Observable, of, Subject } from 'rxjs'
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators'

import { OptionalTextValidation } from '../../common/validations'
import { IUser } from '../../user/user/user'
import { UserService } from '../../user/user/user.service'

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

  readonly isLoadingResults$ = new BehaviorSubject(true)
  loading$: Observable<boolean>
  refresh$ = new Subject<void>()

  search = new FormControl<string>('', OptionalTextValidation)

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(private userService: UserService) {
    this.loading$ = this.isLoadingResults$
  }

  ngAfterViewInit() {
    this.sort.sortChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.paginator.firstPage())

    if (this.skipLoading) {
      return
    }

    setTimeout(() => {
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

          return this.userService.getUsers(
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
    })
  }
}
