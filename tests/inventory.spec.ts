import { test, expect } from '@playwright/test';
import { InventoryPage } from '../src/pages/InventoryPage';
import { InventoryItem } from '../src/pages/InventoryItem';
import { LoginPage } from '../src/pages/LoginPage';
import { users } from '../src/utils/loadEnv';
import { CartPage } from '../src/pages/CartPage';

test.describe('Inventory (Main) Page related tests', () => {
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        // init pages
        const loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
                
        // login which automatically redirects to inventory page
        await loginPage.login(users.standard_user, users.password);

        // Reset app state
        await inventoryPage.resetAppState();
                
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

    test('Add all items to the cart, then remove one from the cart and continue shopping', async ({ page }) => {
        const inventoryItem = new InventoryItem(page);
        inventoryItem.addAllItemsToCart();
        await expect(inventoryPage.cartBadge).toHaveText('6');
        await inventoryPage.goToTheCart();

        const cartPage = new CartPage(page);
        await cartPage.waitForLoad();
        await cartPage.removeFirstItem();

        await expect(inventoryPage.cartBadge).toHaveText('5');
        await cartPage.continueShopingBtn.click();

        await expect(page).toHaveURL(/.*inventory\.html/);
    });
    
});