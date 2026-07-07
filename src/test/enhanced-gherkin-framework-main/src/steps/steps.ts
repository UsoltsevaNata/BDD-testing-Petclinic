import { Browser, BrowserContext, BrowserContextOptions, chromium, Page } from 'playwright';
import { OwnersPage, FindOwnersPage, VetPage, PetsPage, VisitsPage } from '../pom/petclinicPages';
import config from '../utils/config';
import path from 'path';
import { getFormattedTimestamp } from '../utils/timestamp';
import { expect } from 'chai';

let browser: Browser | null = null;
let context: BrowserContext | null = null;
let page: Page | null = null;

let ownersPage: OwnersPage;
let findOwnersPage: FindOwnersPage;
let vetPage: VetPage;
let petsPage: PetsPage;
let visitsPage: VisitsPage;

const variables: { [key: string]: any } = {};
let firstRequestTime = 0;

const actionMappings: { pattern: string; identifier: string }[] = [
    { pattern: 'Open page', identifier: 'openPage' },

    { pattern: 'Fill first name', identifier: 'fillFirstName' },
    { pattern: 'Fill last name', identifier: 'fillLastName' },
    { pattern: 'Fill address', identifier: 'fillAddress' },
    { pattern: 'Fill city', identifier: 'fillCity' },
    { pattern: 'Fill telephone', identifier: 'fillTelephone' },
    { pattern: 'Clear field', identifier: 'clearField' },

    // Buttons
    { pattern: 'Click add owner', identifier: 'clickAddOwner' },
    { pattern: 'Click find owner', identifier: 'clickFindOwner' },
    { pattern: 'Click add pet', identifier: 'clickAddPet' },
    { pattern: 'Click add visit for pet', identifier: 'clickAddVisitForPet' },
    { pattern: 'Click add visit', identifier: 'clickAddVisit' },
    { pattern: 'Click button', identifier: 'clickButton' },
    // Pet fields
    { pattern: 'Fill pet name', identifier: 'fillPetName' },
    { pattern: 'Fill birth date', identifier: 'fillBirthDate' },
    { pattern: 'Select type', identifier: 'selectPetType' },
    // Visit fields
    { pattern: 'Fill visit date', identifier: 'fillVisitDate' },
    { pattern: 'Fill description', identifier: 'fillDescription' },

    // Assertions
    { pattern: 'Success message should be', identifier: 'assertSuccessMessage' },
    { pattern: 'Error message should be', identifier: 'assertErrorMessage' },
    { pattern: 'Page contains', identifier: 'pageContains' },
    { pattern: 'Page does not contain', identifier: 'pageDoesNotContain' },
    { pattern: 'URL should be', identifier: 'assertUrl' },
    { pattern: 'See at least one visit for pet', identifier: 'seeAtLeastOneVisit' },
    { pattern: 'Owner list has more than one row', identifier: 'moreThanOneOwner' },

    { pattern: 'Remember visit count for pet', identifier: 'rememberVisitCount' },
    { pattern: 'Remember page title', identifier: 'rememberTitle' },

    { pattern: 'Send GET request', identifier: 'sendGetRequest' },
    { pattern: 'Response status should be', identifier: 'assertResponseStatus' },
    { pattern: 'Response body should have array', identifier: 'assertResponseBodyArray' },

    { pattern: 'Wait for', identifier: 'waitForSeconds' },

];

function getActionIdentifier(action: string): string | null {
    for (const mapping of actionMappings) {
        if (action.startsWith(mapping.pattern)) {
            return mapping.identifier;
        }
    }
    return null;
}

export async function performAction(action: string, parameters: string[]) {
    await ensureBrowser();

    try {
        const id = getActionIdentifier(action);
        if (!id) throw new Error(`Unknown action: ${action}`);

        switch (id) {
            case 'openPage':
                await ownersPage.open(parameters[0]);
                break;

            case 'fillFirstName':
                await ownersPage.fillFirstName(parameters[0]);
                break;
            case 'fillLastName':
                await ownersPage.fillLastName(parameters[0]);
                break;
            case 'fillAddress':
                await ownersPage.fillAddress(parameters[0]);
                break;
            case 'fillCity':
                await ownersPage.fillCity(parameters[0]);
                break;
            case 'fillTelephone':
                await ownersPage.fillTelephone(parameters[0]);
                break;
            case 'clearField':
                await ownersPage.clearField(parameters[0]);
                break;

            case 'clickAddOwner':
                await ownersPage.clickAddOwner();
                break;
            case 'clickFindOwner':
                await findOwnersPage.clickFindOwner();
                break;
            case 'clickAddPet':
                await petsPage.clickAddPet();
                break;
            case 'clickButton': {
                const buttonText = parameters[0];
                await page!.click(`button:has-text("${buttonText}")`);
                break;
            }
            case 'clickAddVisit':
                await visitsPage.clickAddVisit();
                break;
            case 'fillPetName': {
                let name = parameters[0];
                if (name === 'Alice' && process.env.RUN_INDEX) {
                    name = `Alice${process.env.RUN_INDEX}`;
                    global.petName = name;
                }
                await petsPage.fillPetName(name);
                break;
            }
            case 'fillBirthDate':
                await petsPage.fillBirthDate(parameters[0]);
                break;
            case 'selectPetType':
                await petsPage.selectPetType(parameters[0]);
                break;
            case 'fillVisitDate':
                await visitsPage.fillVisitDate(parameters[0]);
                break;
            case 'fillDescription':
                await visitsPage.fillDescription(parameters[0]);
                break;
            case 'assertSuccessMessage': {
                const msg = await ownersPage.getSuccessMessage();
                expect(msg).to.include(parameters[0]);
                break;
            }
            case 'assertErrorMessage': {
                const err = await ownersPage.getErrorMessage();
                expect(err).to.include(parameters[0]);
                break;
            }
            case 'pageContains': {
                let expected = parameters[0];
                if (expected === 'Alice' && global.petName) {
                    expected = global.petName;
                }
                const body = await page.textContent('body');
                expect(body).to.include(expected);
                break;
            }
            case 'pageDoesNotContain': {
                const body = await page!.textContent('body');
                expect(body).to.not.include(parameters[0]);
                break;
            }
            case 'assertUrl': {
                const url = await ownersPage.getCurrentUrl();
                expect(url).to.include(parameters[0]);
                break;
            }
            case 'seeAtLeastOneVisit': {
                const petName = parameters[0];
                const count = await ownersPage.getPetVisitCount(petName);
                expect(count).to.be.greaterThan(0);
                break;
            }
            case 'moreThanOneOwner': {
                const rows = await page!.$$('#owners tbody tr');
                expect(rows.length).to.be.greaterThan(1);
                break;
            }

            case 'clickAddVisitForPet': {
                const petName = parameters[0];
                await page!.click(`a:has-text("Add Visit")`);
                break;
            }
            case 'sendGetRequest': {
                const resp = await page!.request.get(parameters[0]);
                const body = await resp.json();
                setVariable('lastResponse', { status: resp.status(), body });
                break;
            }
            case 'assertResponseStatus': {
                const expected = parseInt(parameters[0], 10);
                const resp = getVariable('lastResponse');
                expect(resp.status).to.equal(expected);
                break;
            }
            case 'assertResponseBodyArray': {
                const name = parameters[0];
                const resp = getVariable('lastResponse');
                expect(resp.body).to.have.property(name);
                expect(Array.isArray(resp.body[name])).to.be.true;
                break;
            }
            case 'waitForSeconds': {
                const sec = parseInt(parameters[0], 10);
                await page!.waitForTimeout(sec * 1000);
                break;
            }

            default:
                throw new Error(`Unknown action id: ${id}`);
        }
    } catch (error: any) {
        console.error(`❌ Error: ${action} → ${error.message}`);
        const ts = getFormattedTimestamp();
        /*if (config.screenshots.enabled && page) {
            const ssPath = path.resolve(process.cwd(), config.screenshots.path, `error-steps-${ts}.png`);
            await page.screenshot({ path: ssPath });
            console.error(`📸 Screenshot: ${ssPath}`);
        }*/
        throw error;
    }
}

async function ensureBrowser() {
    if (!browser){
        browser = await chromium.launch({ headless: true});
    }
    if (!context || !page) {
        context = await browser.newContext();
        page = await context.newPage();
        ownersPage = new OwnersPage(page!);
        findOwnersPage = new FindOwnersPage(page!);
        vetPage = new VetPage(page!);
        petsPage = new PetsPage(page!);
        visitsPage = new VisitsPage(page!);
    }
}
export async function resetContext() {
    if (context) {
        await context.close();
        context = null;
        page = null;
    }
}
export async function closeBrowser() {
    await resetContext();
    if (browser) {
        await browser.close();
        browser = null;
    }
}

export function setVariable(name: string, value: any) {
    variables[name] = value;
}

export function getVariable(name: string): any {
    return variables[name];
}
