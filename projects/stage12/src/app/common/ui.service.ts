import {
  computed,
  importProvidersFrom,
  inject,
  Injectable,
  makeEnvironmentProviders,
} from '@angular/core'
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog'
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarModule,
} from '@angular/material/snack-bar'
import { patchState, signalState } from '@ngrx/signals'
import { Observable } from 'rxjs'

import { SimpleDialogComponent } from './simple-dialog.component'

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private readonly snackBar = inject(MatSnackBar)
  private readonly dialog = inject(MatDialog)

  private readonly loadState = signalState({ count: 0, isLoading: false })
  isLoading = computed(() => this.loadState.isLoading())

  showLoader() {
    if (this.loadState.count() === 0) {
      patchState(this.loadState, () => ({ isLoading: true }))
    }
    patchState(this.loadState, (state) => ({ count: state.count + 1 }))
  }

  hideLoader() {
    patchState(this.loadState, (state) => ({ count: state.count - 1 }))
    if (this.loadState.count() === 0) {
      patchState(this.loadState, () => ({ isLoading: false }))
    }
  }

  showToast(message: string, action = 'Close', config?: MatSnackBarConfig) {
    this.snackBar.open(
      message,
      action,
      config || {
        duration: 7000,
      }
    )
  }

  showDialog(
    title: string,
    content: string,
    okText = 'OK',
    cancelText?: string,
    customConfig?: MatDialogConfig
  ): Observable<boolean> {
    const dialogRef = this.dialog.open(
      SimpleDialogComponent,
      customConfig || {
        width: '300px',
        data: { title, content, okText, cancelText },
      }
    )

    return dialogRef.afterClosed()
  }
}

export function provideUiService() {
  return makeEnvironmentProviders([
    importProvidersFrom(MatDialogModule, MatSnackBarModule),
  ])
}
