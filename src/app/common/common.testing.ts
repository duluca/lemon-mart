/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { SecurityContext } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { SafeResourceUrl, SafeValue } from '@angular/platform-browser'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { MediaChange } from '@ngbracket/ngx-layout'
import { autoSpyObj } from 'angular-unit-test-helper'
import { Observable, of, Subscription } from 'rxjs'

import { AuthService } from '../auth/auth.service'
import { UiService } from './ui.service'

const FAKE_SVGS = {
  lemon: '<svg><path id="lemon" name="lemon"></path></svg>',
}

export class MediaObserverFake {
  isActive(_query: string): boolean {
    return false
  }

  asObservable(): Observable<MediaChange> {
    return of({} as MediaChange)
  }

  subscribe(
    _next?: (value: MediaChange) => void,
    _error?: (error: Error) => void,
    _complete?: () => void
  ): Subscription {
    return new Subscription()
  }
}

export class MatIconRegistryFake {
  _document = document
  addSvgIcon(_iconName: string, _url: SafeResourceUrl): this {
    // this.addSvgIcon('lemon', 'lemon.svg')
    return this
  }

  getNamedSvgIcon(_name: string, _namespace = ''): Observable<SVGElement> {
    return of(this._svgElementFromString(FAKE_SVGS.lemon))
  }

  private _svgElementFromString(str: string): SVGElement {
    const div = (this._document || document).createElement('DIV')
    div.innerHTML = str
    const svg = div.querySelector('svg') as SVGElement
    if (!svg) {
      throw Error('<svg> tag not found')
    }
    return svg
  }
}

export class DomSanitizerFake {
  bypassSecurityTrustResourceUrl(_url: string): SafeResourceUrl {
    return {} as SafeResourceUrl
  }
  sanitize(context: SecurityContext, value: SafeValue | string | null): string | null {
    return value?.toString() || null
  }
}

export const commonTestingProviders = [
  { provide: AuthService, useValue: autoSpyObj(AuthService) },
  { provide: UiService, useValue: autoSpyObj(UiService) },
] as unknown[] as unknown[]

export const commonTestingModules = [
  ReactiveFormsModule,
  NoopAnimationsModule,
  HttpClientTestingModule,
  RouterTestingModule,
] as unknown[] as unknown[]
