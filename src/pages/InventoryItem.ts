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
        this.itemName = page.locator('[data-test="inventory-item-name"]');
        this.itemDesc = page.locator('[data-test="inventory-item-desc"]');
        this.itemPrice = page.locator('[data-test="inventory-item-price"]');
        this.itemImg = page.locator('[data-test="item-sauce-labs-backpack-img"]');
        this.addToCartBtn = page.locator('button', { hasText: 'Add to cart' });
    }

    async goToItemId(id: number | string) {
        await this.page.goto(`/inventory-item.html?id=${id}`);
    }

    async addItemToCart() {
        await this.addToCartBtn.click();
    }
}