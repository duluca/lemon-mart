import { Component, inject, ViewEncapsulation } from '@angular/core'

import { UiService } from './ui.service'

@Component({
  selector: 'app-loading-overlay',
  template: `
    @if (uiService.isLoading()) {
      <div class="overlay">
        <div class="center">
          <img alt="loading" class="spinner" src="assets/img/icons/lemon.svg" />
        </div>
      </div>
    }
  `,
  styles: `
    .overlay {
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background-color: rgba(255, 255, 255, 0.65);
      z-index: 9999;
    }
    .spinner {
      display: block;
      width: 48px;
      height: 48px;
      animation-name: spin;
      animation-duration: 1.00s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
  `,
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class LoadingOverlayComponent {
  readonly uiService = inject(UiService)
}
