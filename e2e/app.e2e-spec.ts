import { SnakeyPage } from './app.po';

describe('snakey App', () => {
  let page: SnakeyPage;

  beforeEach(() => {
    page = new SnakeyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
