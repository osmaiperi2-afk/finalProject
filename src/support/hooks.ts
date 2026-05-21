import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { request } from '@playwright/test';
import { CustomWorld } from './world';

// Set global step timeout to 60 seconds (covers slow auth on cold starts)
setDefaultTimeout(60 * 1000);

Before(async function (this: CustomWorld) {
  this.request = await request.newContext();
});

After(async function (this: CustomWorld) {
  await this.request?.dispose();
});
