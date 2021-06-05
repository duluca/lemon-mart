import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay'
import { ComponentPortal } from '@angular/cdk/portal'
import { Injectable } from '@angular/core'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'
import { Observable } from 'rxjs'

import { SimpleDialogComponent } from './simple-dialog.component'
import { SpinnerComponent } from './spinner.component'

interface SpinnerConfig {
  panelClass?: string
  hasBackdrop?: boolean
  backdropClass?: string
}

const DEFAULT_CONFIG: SpinnerConfig = {
  hasBackdrop: true,
  backdropClass: 'spinner-backdrop',
  panelClass: '',
}
@Injectable({
  providedIn: 'root',
})
export class UiService {
  private _overlay?: OverlayRef = undefined
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private overlay: Overlay
  ) { }

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

  showSpinner(config: SpinnerConfig = {}) {
    const dialogConfig = { ...DEFAULT_CONFIG, ...config }
    if (this._overlay) return
    this._overlay = this.createSpinnerOverlay(dialogConfig)
    const portal = new ComponentPortal(SpinnerComponent)
    this._overlay.attach(portal)
  }

  closeSpinner() {
    this._overlay?.dispose()
    this._overlay = undefined
  }

  private createSpinnerOverlay(config: SpinnerConfig) {
    const overlayConfig = this.getSpinnerOverlayConfig(config)
    return this.overlay.create(overlayConfig)
  }

  private getSpinnerOverlayConfig(config: SpinnerConfig): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically()

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
    })
    return overlayConfig
  }
}
