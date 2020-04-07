import { browser, by, element } from 'protractor'

export class AppPage {
  navigateTo() {
    return browser.get('/')
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root mat-toolbar .mat-h2')).getText() as Promise<string>
  }
}
