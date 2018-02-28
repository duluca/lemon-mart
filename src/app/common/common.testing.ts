import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from '../material.module'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AuthServiceFake } from '../auth/auth.service.fake'
import { AuthService } from '../auth/auth.service'
import { UiService } from './ui.service'
import { UserServiceFake } from '../user/user/user.service.fake'
import { UserService } from '../user/user/user.service'
import { MatIconRegistry } from '@angular/material'
import { DomSanitizer, SafeResourceUrl, SafeValue } from '@angular/platform-browser'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { fakeAsync } from '@angular/core/testing'
import { of } from 'rxjs/observable/of'
import { Observable } from 'rxjs/Observable'
import { MediaChange } from '@angular/flex-layout'
import { Subscription } from 'rxjs'
import { SecurityContext } from '@angular/platform-browser/src/security/dom_sanitization_service'
import { SharedComponentsModule } from '../shared-components.module'

const FAKE_SVGS = {
  lemon: '<svg><path id="lemon" name="lemon"></path></svg>',
}

export class ObservableMediaFake {
  isActive(query: string): boolean {
    return false
  }

  asObservable(): Observable<MediaChange> {
    return of({} as MediaChange)
  }

  subscribe(
    next?: (value: MediaChange) => void,
    error?: (error: any) => void,
    complete?: () => void
  ): Subscription {
    return new Subscription()
  }
}

export class MatIconRegistryFake {
  _document = document
  addSvgIcon(iconName: string, url: SafeResourceUrl): this {
    //this.addSvgIcon('lemon', 'lemon.svg')
    return this
  }

  getNamedSvgIcon(name: string, namespace: string = ''): Observable<SVGElement> {
    return of(this._svgElementFromString(FAKE_SVGS.lemon))
  }

  private _svgElementFromString(str: string): SVGElement {
    if (this._document || typeof document !== 'undefined') {
      const div = (this._document || document).createElement('DIV')
      div.innerHTML = str
      const svg = div.querySelector('svg') as SVGElement
      if (!svg) {
        throw Error('<svg> tag not found')
      }
      return svg
    }
  }
}

export class DomSanitizerFake {
  bypassSecurityTrustResourceUrl(url: string): SafeResourceUrl {
    return {} as SafeResourceUrl
  }
  sanitize(context: SecurityContext, value: SafeValue | string | null): string | null {
    return value ? value.toString() : null
  }
}

export const commonTestingProviders: any[] = [
  { provide: AuthService, useClass: AuthServiceFake },
  { provide: UserService, useClass: UserServiceFake },
  UiService,
]

export const commonTestingModules: any[] = [
  FormsModule,
  ReactiveFormsModule,
  MaterialModule,
  NoopAnimationsModule,
  HttpClientTestingModule,
  RouterTestingModule,
  SharedComponentsModule,
]
