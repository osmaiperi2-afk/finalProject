import { Given, When, Then } from '@cucumber/cucumber'
import { APIClient } from '../../api/clients/APIClient';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../support/world';

Given('doctor is logged in', async function (this: CustomWorld) {
    const apiClient = new APIClient();

    this.token = await apiClient.login({
        request: this.request,
        email: process.env.USER_EMAIL!,
        password: process.env.USER_PASSWORD!
    });
});

When('user hits GET {string}', async function (this: CustomWorld, endpoint: string) {
    const url = process.env.BASE_URL!.replace(/\/$/, '') + endpoint;
    this.response = await this.request.get(url, {
        headers: {
            Authorization: `Bearer ${this.token}`,
            Accept: 'application/json'
        }
    });
    this.statusCode = this.response.status();
});

When('user hits POST {string} with body', async function (this: CustomWorld, endpoint: string, body: string) {
    const url = process.env.BASE_URL!.replace(/\/$/, '') + endpoint;
    const parsedBody = JSON.parse(body);

    // Generate unique values to avoid 409 conflicts on repeated runs
    const ts = Date.now();
    if (parsedBody.email    === 'string') parsedBody.email    = `test.patient.${ts}@test.com`;
    if (parsedBody.phone    === 'string') parsedBody.phone    = `+1${ts.toString().slice(-10)}`;
    if (parsedBody.first_name === 'string') parsedBody.first_name = `Test`;
    if (parsedBody.last_name  === 'string') parsedBody.last_name  = `Patient_${ts}`;

    this.response = await this.request.post(url, {
        headers: {
            Authorization: `Bearer ${this.token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        data: parsedBody
    });
    this.statusCode = this.response.status();
    this.responseBody = await this.response.json().catch(() => ({}));
    console.log('POST response body:', JSON.stringify(this.responseBody, null, 2));
});

Then('verify status code is {int}', function (this: CustomWorld, expectedStatusCode: number) {
    expect(this.statusCode).toBe(expectedStatusCode);
});
