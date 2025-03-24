import { test, expect } from '@playwright/test';
import { InventoryPage } from '../src/pages/InventoryPage';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('Inventory (Main) Page related tests', () => {
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        // init pages
        const loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
                
        // login which automatically redirects to inventory page
        await loginPage.login('standard_user', 'secret_sauce');
                
        // ensure that product items are visible before assertions.
        await page.waitForSelector('.inventory_item');
    });


    test('Product items visible on the Inventory Page', async () => {
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

    test('Sorting changes results order', async () => {
        let firstItemTitle: string | undefined;

        // assert default sorting first item on the list
        firstItemTitle = await inventoryPage.getFirstItemTitle();
        expect(firstItemTitle).toBe('Sauce Labs Backpack');

        // select "Name (Z to A)" sorting option and assert first item title
        await inventoryPage.selectSortingOption('za');
        firstItemTitle = await inventoryPage.getFirstItemTitle();
        expect(firstItemTitle).toBe('Test.allTheThings() T-Shirt (Red)');

        // select "Price (low to high)" sorting option and assert first item title
        await inventoryPage.selectSortingOption('lohi');
        firstItemTitle = await inventoryPage.getFirstItemTitle();
        expect(firstItemTitle).toBe('Sauce Labs Onesie');

        // select "Price (hight to low)" sorting option and assert first item title
        await inventoryPage.selectSortingOption('hilo');
        firstItemTitle = await inventoryPage.getFirstItemTitle();
        expect(firstItemTitle).toBe('Sauce Labs Fleece Jacket');
    });
});