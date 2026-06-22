export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(url, timeout = 60000) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout });
  }
}
