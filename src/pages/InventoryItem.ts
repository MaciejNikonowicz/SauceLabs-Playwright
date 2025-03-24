import { Locator, Page } from '@playwright/test';

export class InventoryItem {
    readonly page: Page;
    readonly itemName: Locator;
    readonly itemDesc: Locator;
    readonly itemPrice: Locator;
    readonly itemImg: Locator;
    readonly addToCartBtn: Locator;
    readonly cartIcon: Locator;
    readonly cartBadge: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.itemName = page.locator('[data-test="inventory-item-name"]');
        this.itemDesc = page.locator('[data-test="inventory-item-desc"]');
        this.itemPrice = page.locator('[data-test="inventory-item-price"]');
        this.itemImg = page.locator('[data-test="item-sauce-labs-backpack-img"]');
        this.addToCartBtn = page.locator('[data-test="add-to-cart"]');
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

    async goToItemId(id: number | string) {
        await this.page.goto(`/inventory-item.html?id=${id}`);
    }

    async addItemToCart() {
        await this.addToCartBtn.click();
    }
}