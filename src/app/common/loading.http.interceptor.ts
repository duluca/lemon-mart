import { HttpHandlerFn, HttpRequest } from '@angular/common/http'
import { inject } from '@angular/core'
import { finalize } from 'rxjs'

import { UiService } from './ui.service'

export function LoadingHttpInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const uiService = inject(UiService)
  uiService.showLoader()
  return next(req).pipe(finalize(() => uiService.hideLoader()))
}
