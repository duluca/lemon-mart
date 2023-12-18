import { Component, Inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'

@Component({
  // prettier-ignore
  template: `
    <h2 mat-dialog-title>{{ data.title }}</h2>
    <mat-dialog-content>
      <p>{{ data.content }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <span class="flex-spacer"></span>
      @if (data.cancelText) {
        <button mat-button mat-dialog-close>
          {{ data.cancelText }}
        </button>
      }
      <button mat-button mat-button-raised color="primary" [mat-dialog-close]="true"
        cdkFocusInitial>
        {{ data.okText }}
      </button>
    </mat-dialog-actions>
    `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class SimpleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SimpleDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; content: string; okText: string; cancelText: string }
  ) {}
}
