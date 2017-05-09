import { ReservaHosteleriaPage } from './app.po';

describe('reserva-hosteleria App', () => {
  let page: ReservaHosteleriaPage;

  beforeEach(() => {
    page = new ReservaHosteleriaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('rh works!');
  });
});
