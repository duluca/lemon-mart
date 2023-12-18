import { NgClass } from '@angular/common'
import {
  AfterViewInit,
  Component,
  ElementRef,
  forwardRef,
  ViewChild,
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'

@Component({
  selector: 'app-lemon-rater',
  templateUrl: 'lemon-rater.component.html',
  styleUrls: ['lemon-rater.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LemonRaterComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [NgClass],
})
export class LemonRaterComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChild('displayText', { static: false }) displayTextRef!: ElementRef
  disabled = false

  private internalValue!: number
  get value() {
    return this.internalValue
  }

  ratings = Object.freeze([
    {
      value: 1,
      text: 'no zest',
    },
    {
      value: 2,
      text: 'neither a lemon or a lime ',
    },
    {
      value: 3,
      text: 'a true lemon',
    },
  ])

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChanged: (value: number) => unknown = () => {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => unknown = () => {}

  ngAfterViewInit(): void {
    this.setSelectedText(this.internalValue)
  }

  writeValue(obj: number): void {
    this.internalValue = obj
  }
  registerOnChange(fn: () => void): void {
    this.onChanged = fn
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  setRating(lemon: { value: number }) {
    if (!this.disabled) {
      this.internalValue = lemon.value
      this.setDisplayText()
      this.onChanged(lemon.value)
      this.onTouched()
    }
  }

  setDisplayText() {
    this.setSelectedText(this.internalValue)
  }

  private setSelectedText(value: number) {
    this.displayTextRef.nativeElement.textContent = this.getSelectedText(value)
  }

  private getSelectedText(value: number) {
    let text = ''

    if (value) {
      text = this.ratings.find((i) => i.value === value)?.text || ''
    }

    return text
  }
}
