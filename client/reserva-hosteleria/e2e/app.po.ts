import { browser, element, by } from 'protractor';

export class ReservaHosteleriaPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('rh-root h1')).getText();
  }
}
