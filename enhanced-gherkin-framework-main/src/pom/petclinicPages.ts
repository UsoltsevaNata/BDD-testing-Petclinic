import { Page } from 'playwright';
import { BasePage } from './pages';
export class OwnersPage extends BasePage {
    async fillFirstName(v: string) { await this.type('[name="firstName"]', v); }
    async fillLastName(v: string) { await this.type('[name="lastName"]', v); }
    async fillAddress(v: string) { await this.type('[name="address"]', v); }
    async fillCity(v: string) { await this.type('[name="city"]', v); }
    async fillTelephone(v: string) { await this.type('[name="telephone"]', v); }
    async clearField(name: string) { await this.page.fill(`[name="${name}"]`, ''); }
    async clickAddOwner() { await this.click('button[type="submit"]'); }
    async getSuccessMessage(): Promise<string> { return await this.getText('#success-message'); }
    async getErrorMessage(): Promise<string> {
        let errorElement = await this.page.$('.help-inline');
        if (errorElement) {
            return await this.getText('.help-inline');
        }
        errorElement = await this.page.$('#error-message');
        if (errorElement) {
            return await this.getText('#error-message');
        }
        return '';
    }
    async getOwnerIdFromUrl(): Promise<string> {
        const m = this.page.url().match(/\/owners\/(\d+)/);
        return m ? m[1] : '';
    }
    async getPetIdFromUrl(): Promise<string> {
        const m = this.page.url().match(/\/pets\/(\d+)/);
        return m ? m[1] : '';
    }
    async getPetVisitCount(petName: string): Promise<number> {
        const row = this.page.locator(`tr:has-text("${petName}")`);
        const visits = row.locator('table.table-condensed tbody tr');
        return await visits.count();
    }
    async clearField(fieldName: string) {
        await this.page.fill(`[name="${fieldName}"]`, '');
    }
    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }
    async getPetIdFromUrl(): Promise<string> {
        const match = this.page.url().match(/\/pets\/(\d+)/);
        return match ? match[1] : '';
    }
    async getOwnerIdFromUrl(): Promise<string> {
        const match = this.page.url().match(/\/owners\/(\d+)/);
        return match ? match[1] : '';
    }
    async getPetVisitCount(petName: string): Promise<number> {
        const row = this.page.locator(`tr:has-text("${petName}")`);
        const visits = row.locator('table.table-condensed tbody tr');
        return await visits.count();
    }
}
export class FindOwnersPage extends BasePage {
    async fillLastName(v: string) { await this.type('[name="lastName"]', v); }
    async clickFindOwner() { await this.click('button[type="submit"]'); }
}
export class PetsPage extends BasePage {
    async fillPetName(v: string) { await this.type('[name="name"]', v); }
    async fillBirthDate(v: string) { await this.type('[name="birthDate"]', v); }
    async selectPetType(type: string) { await this.page.selectOption('[name="type"]', { label: type }); }
    async clickAddPet() { await this.click('button:has-text("Add Pet")'); }
    async clickUpdatePet() { await this.click('button:has-text("Update Pet")'); }
    async getErrorMessage(): Promise<string> { return await this.getText('.help-inline'); }
}
export class VisitsPage extends BasePage {
    async fillVisitDate(v: string) { await this.type('[name="date"]', v); }
    async fillDescription(v: string) { await this.type('[name="description"]', v); }
    async clickAddVisit() { await this.click('button[type="submit"]'); }
}
export class VetPage extends BasePage {
    async getVetsCount(): Promise<number> {
        return await this.page.$$('#vets tbody tr').then(rows => rows.length);
    }
}
