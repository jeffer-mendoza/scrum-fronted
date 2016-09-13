import { HolaPage } from './app.po';

describe('hola App', function() {
  let page: HolaPage;

  beforeEach(() => {
    page = new HolaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
