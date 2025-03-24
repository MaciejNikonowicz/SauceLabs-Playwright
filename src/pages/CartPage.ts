import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly continueShopingBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.continueShopingBtn = page.locator('button', { hasText: 'Continue Shopping' })
    }

    async waitForLoad(): Promise<void> {
        await this.page.waitForSelector('.cart_item');
    }

    async removeFirstItem(): Promise<void> {
        await this.cartItems.first().locator('button', { hasText: 'Remove' }).click();
    }
}