import { browser, by, element } from 'protractor';

export class RedeFpHostalariaPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('rh-root h1')).getText();
  }
}
