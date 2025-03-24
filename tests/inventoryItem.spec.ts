import { test, expect } from '@playwright/test';
import { InventoryItem } from '../src/pages/InventoryItem';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('Inventory Item details page tests', () => {
    let inventoryItem: InventoryItem;
    
    test.beforeEach(async ({ page }) => {
        // init pages
        const loginPage = new LoginPage(page);
        inventoryItem = new InventoryItem(page);
                    
        // login and go to Sauce Labs Backpack details page
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryItem.goToItemId(4);
    });

    test('Assert correct price and add item to cart', async () => {
        expect(inventoryItem.itemPrice).toHaveText('$29.99');
        await inventoryItem.addItemToCart();
        await expect(inventoryItem.cartBadge).toBeVisible();
        await expect(inventoryItem.cartBadge).toHaveText('1');
    });
});