export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigate(url, options = {}) {
    await this.page.goto(url, options);
  }
}