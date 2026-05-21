import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { APIRequestContext, APIResponse } from '@playwright/test';

export class CustomWorld extends World {
  request!: APIRequestContext;
  token!: string;
  response!: APIResponse;
  statusCode!: number;
  responseBody!: Record<string, unknown>;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
