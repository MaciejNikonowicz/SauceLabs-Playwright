import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('.cart-item');
    }

    async waitForLoad(): Promise<void> {
        await this.page.waitForSelector('.cart-item');
    }

    async removeFirstItem(): Promise<void> {
        await this.cartItems.first().locator('button', { hasText: 'Remove' }).click();
    }
}