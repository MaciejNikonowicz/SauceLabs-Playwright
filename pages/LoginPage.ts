import { Page, Locator } from  '@playwright/test';

export class LoginPage {
    readonly page: Page;
    private usernameInput: Locator;
    private passwordInput: Locator;
    private loginBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginBtn = page.locator('#login-button');
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }
}