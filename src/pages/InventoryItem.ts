import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryItem extends BasePage {
    readonly page: Page;
    readonly itemName: Locator;
    readonly itemDesc: Locator;
    readonly itemPrice: Locator;
    readonly itemImg: Locator;
    readonly addToCartBtn: Locator;
    
    constructor(page: Page) {
        super(page);
        this.page = page;
        // Selector for item name
        this.itemName = page.locator('[data-test="inventory-item-name"]');
        // Selector for item description
        this.itemDesc = page.locator('[data-test="inventory-item-desc"]');
        // Selector for item price
        this.itemPrice = page.locator('[data-test="inventory-item-price"]');
        // Selector for item's image
        this.itemImg = page.locator('[data-test="item-sauce-labs-backpack-img"]');
        // Selector for item Add to cart button
        this.addToCartBtn = page.locator('button', { hasText: 'Add to cart' });
    }

    async goToItemId(id: number | string): Promise<void> {
        await this.page.goto(`/inventory-item.html?id=${id}`);
    }

    async addItemToCart(): Promise<void> {
        await this.addToCartBtn.click();
    }

    async addAllItemsToCart(): Promise<void> {
        while (await this.addToCartBtn.count() > 0) {
            await this.addToCartBtn.nth(0).click();
        }
    }
}