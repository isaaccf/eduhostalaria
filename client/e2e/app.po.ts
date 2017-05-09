import { browser, element, by } from 'protractor';

export class CashFlowPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('rh-root h1')).getText();
  }
}
