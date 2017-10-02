import { browser, by, element } from 'protractor';

fdescribe('popups', () => {
  it('', async () => {
    await browser.get('http://toolsqa.com/automation-practice-switch-windows/');

    await element(by.buttonText('New Browser Window')).click();
    await browser.sleep(10000);
    await expect(true).toBe(true);
  });
});
