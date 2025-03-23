import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('SauceDemo Login Tests', () => {
    test('User can log in with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/.*inventory\.html/);
    });
});