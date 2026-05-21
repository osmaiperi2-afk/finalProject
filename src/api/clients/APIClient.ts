import { expect, APIRequestContext, APIResponse } from "@playwright/test";

interface LoginParams {
    request: APIRequestContext;
    email: string;
    password: string;
}

export class APIClient {
    token: string

    async login({ request, email, password }: LoginParams): Promise<string> {
        const url = process.env.BASE_URL!.replace(/\/$/, '') + '/api-auth/login';

        console.log('URL: ' + url);

        const response = await request.post(url, {
            headers: {
                Accept: 'application/json',
                apikey: process.env.SUPABASE_ANON_KEY!
            },
            data: {
                email,
                password
            }
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        const token: string = responseBody.token;
        if (!token) {
            throw new Error(`Login succeeded but no token was returned. Response body: ${JSON.stringify(responseBody)}`);
        }
        console.log('TOKEN: ' + token);
        return token;
    }

    async getRequest({ request, endpoint }): Promise<APIResponse> {
        const url = process.env.BASE_URL!.replace(/\/$/, '') + endpoint;

        this.token = await this.login({
            request,
            email: process.env.USER_EMAIL!,
            password: process.env.USER_PASSWORD!
        });

        const response = await request.get(url, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${this.token}`
            }
        });

        return response;
    }

    async postRequest({ request, endpoint, body }): Promise<APIResponse> {
        const url = process.env.BASE_URL!.replace(/\/$/, '') + endpoint;

        this.token = await this.login({
            request,
            email: process.env.USER_EMAIL!,
            password: process.env.USER_PASSWORD!
        });

        const response = await request.post(url, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.token}`
            },
            data: body
        });

        return response;
    }
}