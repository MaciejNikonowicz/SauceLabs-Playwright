import { Page, Locator } from '@playwright/test';

export class BasePage {
    protected page: Page;
    readonly cartIcon: Locator;
    readonly cartBadge: Locator;
    readonly burgerMenu: Locator;
    readonly resetState: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.burgerMenu = page.locator('#react-burger-menu-btn');
        this.resetState = page.locator('a', { hasText: 'Reset App State' });
    }

    async goToTheCart(): Promise<void> {
        await this.cartIcon.click();
    }

    async resetAppState(): Promise<void> {
        await this.burgerMenu.click();
        await this.resetState.click();
    }
}