import { ElementRef, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core'
import { Directive } from '@angular/core'
import { AbstractControl } from '@angular/forms'
import { BehaviorSubject, Subscription } from 'rxjs'
import { filter, tap } from 'rxjs/operators'

type ValidationError = 'required' | 'minlength' | 'maxlength' | 'invalid'

@Directive({
  selector: '[appFormError]',
})
export class FormErrorDirective implements OnDestroy, OnChanges {
  @Input() fieldControl: AbstractControl | null
  @Input() appFormError: ValidationError[] | { error: ValidationError; message: string }[]
  @Input() fieldLabel: string

  private controlSubscription: Subscription | undefined

  errorMessages$ = new BehaviorSubject<string[]>([])

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.fieldControl) {
      console.error(`appFormError couldn't map to a control.`)
    }

    this.unsubscribe()

    this.controlSubscription = this.fieldControl?.valueChanges
      .pipe(
        filter(() => this.fieldControl != null && this.fieldControl?.invalid),
        tap(() => this.updateErrorMessage())
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this.unsubscribe()
  }

  unsubscribe(): void {
    this.controlSubscription?.unsubscribe()
  }

  updateErrorMessage() {
    const errorsToDisplay: string[] = []

    this.appFormError.forEach(
      (error: ValidationError | { error: ValidationError; message: string }) => {
        const errorCode = typeof error === 'object' ? error.error : error
        const message =
          typeof error === 'object'
            ? () => error.message
            : () => this.getStandardErrorMessage(errorCode)
        const errorChecker =
          errorCode === 'invalid'
            ? () => this.fieldControl?.invalid
            : () => this.fieldControl?.hasError(errorCode)

        if (errorChecker()) {
          errorsToDisplay.push(message())
        }
      }
    )

    this.el.nativeElement.innerHTML = errorsToDisplay.join('<br>')
  }

  getStandardErrorMessage(error: ValidationError): string {
    const label = this.fieldLabel || 'Input'
    const errorDetails = this.fieldControl?.getError(error) // {requiredLength: number, minLength: number}

    switch (error) {
      case 'required':
        return `${label} is required`
      case 'minlength':
        return `${label} must be at least ${errorDetails?.requiredLength ?? 2} characters`
      case 'maxlength':
        return `${label} can\'t exceed ${errorDetails?.requiredLength ?? 50} characters`
      case 'invalid':
        return `A valid ${label} is required`
    }
  }
}
