const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { getPage } = require('../support/hooks');

Given('PetClinic application is running', async function () {
    const page = getPage();
    await page.goto('http://localhost:8080');
    await expect(page.locator('body')).toBeVisible();
});

When('I navigate to {string}', async function (path) {
    const page = getPage();
    await page.goto(`http://localhost:8080${path}`);
});

When('I navigate to the new owner page', async function () {
    const page = getPage();
    await page.goto('http://localhost:8080/owners/new');
});

When('I fill first name with {string}', async function (firstName) {
    const page = getPage();
    await page.fill('[name="firstName"]', firstName);
});

When('I fill last name with {string}', async function (lastName) {
    const page = getPage();
    await page.fill('[name="lastName"]', lastName);
});

When('I fill address with {string}', async function (address) {
    const page = getPage();
    await page.fill('[name="address"]', address);
});

When('I fill city with {string}', async function (city) {
    const page = getPage();
    await page.fill('[name="city"]', city);
});

When('I fill telephone with {string}', async function (telephone) {
    const page = getPage();
    await page.fill('[name="telephone"]', telephone);
});

When('I click {string}', async function (buttonText) {
    const page = getPage();
    await page.click(`button:has-text("${buttonText}")`);
});

When('I clear the address field', async function () {
    const page = getPage();
    await page.fill('[name="address"]', '');
});

When('I navigate to the find owners page', async function () {
    const page = getPage();
    await page.goto('http://localhost:8080/owners/find');
});

When('I fill last name with {string} for search', async function (lastName) {
    const page = getPage();
    await page.fill('[name="lastName"]', lastName);
});

When('I navigate to the edit page for owner with id {int}', async function (id) {
    const page = getPage();
    await page.goto(`http://localhost:8080/owners/${id}/edit`);
});

Then('I should see a list of owners', async function () {
    const page = getPage();
    await expect(page.locator('#owners')).toBeVisible();
});

Then('the list should contain at least {int} owners', async function (count) {
    const page = getPage();
    const rows = page.locator('#owners tbody tr');
    await expect(rows).toHaveCount(count, { timeout: 5000 });
});

Then('I should be redirected to the owner details page', async function () {
    const page = getPage();
    await page.waitForURL(/\/owners\/\d+/);
});

Then('I should see {string}', async function (text) {
    const page = getPage();
    await expect(page.locator(`text=${text}`).first()).toBeVisible();
});

Then('I should see an error message {string}', async function (expected) {
    const page = getPage();
    const errorLocator = page.locator('.help-inline, #error-message');
    await expect(errorLocator).toContainText(expected);
});

Then('I should see the message {string}', async function (expected) {
    const page = getPage();
    await expect(page.locator('#success-message')).toContainText(expected);
});

Then('I should see {string} on the page', async function (text) {
    const page = getPage();
    let expected = text;
    if (text === 'Alice' && global.__petName) {
        expected = global.__petName;
    }
    await expect(page.locator(`text=${expected}`).first()).toBeVisible();
});

Then('I should not see {string} on the page', async function (text) {
    const page = getPage();
    await expect(page.locator(`text=${text}`)).toHaveCount(0);
});

When('I fill pet name with {string}', async function (name) {
    const page = getPage();
    let actualName = name;
    if (name === 'Alice' && process.env.RUN_INDEX) {
        actualName = `Alice${process.env.RUN_INDEX}`;
        global.__petName = actualName;
    }
    await page.fill('[name="name"]', actualName);
});

When('I fill birth date with {string}', async function (date) {
    const page = getPage();
    await page.fill('[name="birthDate"]', date);
});

When('Wait for {int} seconds', async function (seconds) {
    const page = getPage();
    await page.waitForTimeout(seconds * 1000);
});

When('I select pet type {string}', async function (type) {
    const page = getPage();
    await page.selectOption('[name="type"]', type.toLowerCase());
});

When('I navigate to the edit pet page for owner {int} and pet {int}', async function (ownerId, petId) {
    const page = getPage();
    await page.goto(`http://localhost:8080/owners/${ownerId}/pets/${petId}/edit`);
});

When('I navigate to the new pet page for owner with id {int}', async function (ownerId) {
    const page = getPage();
    await page.goto(`http://localhost:8080/owners/${ownerId}/pets/new`);
});

When('I navigate to the new visit page for owner {int} and pet {int}', async function (ownerId, petId) {
    const page = getPage();
    await page.goto(`http://localhost:8080/owners/${ownerId}/pets/${petId}/visits/new`);
});

When('I fill description with {string}', async function (desc) {
    const page = getPage();
    await page.fill('[name="description"]', desc);
});

When('I fill visit date with {string}', async function (date) {
    const page = getPage();
    await page.fill('[name="date"]', date);
});

Then('I should see the text {string}', async function (text) {
    const page = getPage();
    await expect(page.locator(`text=${text}`).first()).toBeVisible();
});
