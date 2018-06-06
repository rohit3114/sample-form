import { FormPage } from './app.po';

describe('form App', () => {
  let page: FormPage;

  beforeEach(() => {
    page = new FormPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
