import { HttpErrorResponse } from '@angular/common/http'
import { ErrorObservable } from 'rxjs/observable/ErrorObservable'
import { Observable } from 'rxjs'
import { of } from 'rxjs/observable/of'

export function transformError(error: HttpErrorResponse | string) {
  let errorMessage = 'An unknown error has occurred'
  if (typeof error === 'string') {
    errorMessage = error
  } else if (error.error instanceof ErrorEvent) {
    errorMessage = `Error! ${error.error.message}`
  } else if (error.status) {
    errorMessage = `Request failed with ${error.status} ${error.statusText}`
  }
  return new ErrorObservable(errorMessage)
}
