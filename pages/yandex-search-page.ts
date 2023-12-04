import { type Locator, type Page } from '@playwright/test';

export class YandexSearchPage {
  readonly page: Page;
  readonly searchButton: Locator;
  readonly title: Locator;
  readonly countPage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('.serp-item_card  div div a h2 span'); // строка поиска
    this.countPage = page.locator('Pager-ListItem_type_page');
  }

  async getTitle() {
    let titles: Array<Locator> = await this.title.all();
    return titles;
  }

  async getPageNumber(counter: number) {
    let pageNumber = await this.countPage.all();
    for (let number of pageNumber) {
      if (Number(number.textContent) == counter) {
        await number.click();
        return number;
      }
    }
  }

  async checkTitle(word: string) {
    let count = 0;
    let pageCount = 1;
    while (true) {
      if (count >= 100) {
        throw new Error('Count >= 100!!');
      }
      let titles = await this.getTitle();
      for (let title in titles) {
        if (title == word) {
          return true;
        } else {
          count += 1;
        }
      }
      pageCount += 1;
      this.getPageNumber(pageCount);
    }
  }
}
