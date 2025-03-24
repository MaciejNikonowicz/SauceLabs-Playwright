import { test, expect } from '@playwright/test';
import { users } from '../src/utils/loadEnv';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('SauceDemo Login Tests', () => {
    test('User can log in with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(users.standard_user, users.password);
        await expect(page).toHaveURL(/.*inventory\.html/);
    });

    test('Try to login as locked out user and assert validation', async({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(users.locked_out_user, users.password);
        await expect(loginPage.validationError).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });
});