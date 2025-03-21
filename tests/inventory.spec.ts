import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';

test.describe('Inventory (Main) Page related tests', () => {
    test('Product items visible on the Inventory Page', async ({ page }) => {
        // init pages
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);

        // login which automatically redirects to inventory page
        await page.goto('/');
        await loginPage.login('standard_user', 'secret_sauce');

        // ensure that product items are visible before assertions.
        await page.waitForSelector('.inventory_item');

        // verify that all products are visible
        const productCount = await inventoryPage.getProductCount();
        expect(productCount).toBe(6);

        // verify each product has title visible
        const titles = await inventoryPage.getProductTitles();
        for (const title of titles) {
            expect(title.trim().length).toBeGreaterThan(0);
        }

        // verify that each product has a price that starts with a '$'.
        const prices = await inventoryPage.getProductPrices();
        for (const price of prices) {
            expect(price.trim()).toMatch(/^\$/);
        }
    });
});