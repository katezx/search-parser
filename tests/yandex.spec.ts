import { test, expect } from '@playwright/test';
import { YandexMainPage } from '../pages/yandex-main-page';
import { YandexSearchPage } from '../pages/yandex-search-page';

const companies = ['русский буровой отдел', 'тюменская лига буровых'];
for (let nameOfCompany of companies) {
  test('Check full company name ${nameOfCompany} in top 100 position on search resutls', async ({
    page,
  }) => {
    const MainPage = new YandexMainPage(page);
    const SearchPage = new YandexSearchPage(page);
    await MainPage.goto();
    await MainPage.fillSearchField(nameOfCompany);
    await MainPage.pressButtonSearch();
    await expect(SearchPage.checkTitle(nameOfCompany)).toEqual(true);
  });
}
