import {type Locator, type Page } from '@playwright/test';


export class YandexMainPage {
    readonly page: Page;
    readonly search: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.search = page.locator('[id="text"]'); // строка поиска
        this.searchButton = page.locator('[type="submit"]'); // кнопка поиска
    }
    async goto() {
        await this.page.goto('https://ya.ru');
      }

    async fillSearchField(word: string){
        await this.search.click()
        await this.search.fill(word)
    }  

    async pressButtonSearch(){
        await this.searchButton.click()

    } 
 }
