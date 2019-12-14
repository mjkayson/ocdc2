import { AppPage } from './app.po';

describe('new App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
  describe('default screen', () => {
    beforeEach(() => {
      page.navigateTo('/game');
    });
    it('should have a title saying Game', () => {
      page.getPageOneTitleText().then(title => {
        expect(title).toEqual('Game');
      });
    });
  });
});
