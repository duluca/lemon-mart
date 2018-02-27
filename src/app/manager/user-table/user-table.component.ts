import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material'
import { UserService } from '../../user/user/user.service'
import { startWith, switchMap, map, catchError } from 'rxjs/operators'
import { of } from 'rxjs/observable/of'
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import { OptionalTextValidation } from '../../common/validations'
import { IUser } from '../../user/user/user'

import { merge } from 'rxjs/observable/merge'
import 'rxjs/add/operator/debounceTime'

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit, AfterViewInit {
  displayedColumns = ['name', 'email', 'role', 'status', 'id']
  dataSource = new MatTableDataSource()
  searchForm: FormGroup
  resultsLength = 0
  isLoadingResults = true
  hasError = false
  errorText = ''

  search = new FormControl('', OptionalTextValidation)

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(private userService: UserService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0))

    merge(
      this.sort.sortChange,
      this.paginator.page,
      this.search.valueChanges.debounceTime(1000)
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true
          return this.userService.getUsers(
            this.paginator.pageSize,
            this.search.value,
            this.paginator.pageIndex
          )
        }),
        map((data: { total: number; items: IUser[] }) => {
          this.isLoadingResults = false
          this.hasError = false
          this.resultsLength = data.total

          return data.items
        }),
        catchError(err => {
          this.isLoadingResults = false
          this.hasError = true
          this.errorText = err
          return of([])
        })
      )
      .subscribe(data => (this.dataSource.data = data))
  }
}
