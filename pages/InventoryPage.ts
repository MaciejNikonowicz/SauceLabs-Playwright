import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly productItems: Locator;
    readonly productTitles: Locator;
    readonly productPrices: Locator;

    constructor(page: Page) {
        this.page = page;
        // Locator for each product container on the inventory page.
        this.productItems = page.locator('.inventory_item');
        // Locator for product names.
        this.productTitles = page.locator('.inventory_item_name');
        // Locator for product prices.
        this.productPrices = page.locator('.inventory_item_price');
    }

    async getProductCount(): Promise<number> {
        return await this.productItems.count();
    }

    async getProductTitles(): Promise<string[]> {
        return await this.productTitles.allTextContents();
    }

    async getProductPrices(): Promise<string[]> {
        return await this.productPrices.allTextContents();
    }
}