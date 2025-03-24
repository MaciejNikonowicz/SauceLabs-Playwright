import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
    readonly page: Page;
    readonly productItems: Locator;
    readonly productTitles: Locator;
    readonly productPrices: Locator;
    readonly productSortContainer: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        // Locator for each product container on the inventory page
        this.productItems = page.locator('.inventory_item');
        // Locator for product names
        this.productTitles = page.locator('.inventory_item_name');
        // Locator for product prices
        this.productPrices = page.locator('.inventory_item_price');
        // Locator for product sorting
        this.productSortContainer = page.locator('.product_sort_container');
    }

    async getProductCount(): Promise<number> {
        return await this.productItems.count();
    }

    async getProductTitles(): Promise<string[]> {
        return await this.productTitles.allTextContents();
    }

    async getFirstItemTitle(): Promise<string> {
        const titles = await this.getProductTitles();
        return titles[0];
    }

    async getProductPrices(): Promise<string[]> {
        return await this.productPrices.allTextContents();
    }

    async selectSortingOption(optionValue: string): Promise<void> {
        await this.productSortContainer.selectOption(optionValue);
    }
}