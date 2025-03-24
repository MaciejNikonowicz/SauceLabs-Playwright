import { Page, Locator } from '@playwright/test';

export class BasePage {
    protected page: Page;
    readonly cartIcon: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    async goToTheCart() {
        await this.cartIcon.click();
    }
}