import { test, expect } from '@playwright/test';
import { uuid } from 'uuidv4';

test.setTimeout(35e3);

test('go to /', async ({ page }) => {
  await page.goto('/');

  await page.waitForSelector(`text=Starter`);
});

test('test 404', async ({ page }) => {
  const res = await page.goto('/post/not-found');
  expect(res?.status()).toBe(404);
});

test('add a post', async ({ page, browser }) => {
  const nonce = `${uuid()}`;

  await page.goto('/');
  await page.waitForNavigation();
  await page.fill(`[name=title]`, nonce);
  await page.fill(`[name=text]`, nonce);
  await page.click(`form [type=submit]`);
  await page.waitForLoadState('networkidle');
  await page.reload();

  expect(await page.content()).toContain(nonce);

  const ssrContext = await browser.newContext({
    javaScriptEnabled: true,
  });
  const ssrPage = await ssrContext.newPage();
  await ssrPage.goto('/');

  expect(await ssrPage.content()).toContain(nonce);
});

test('server-side rendering test', async ({ page, browser }) => {
  // add a post
  const nonce = `${uuid()}`;

  await page.goto('/');
  await page.fill(`[name=title]`, nonce);
  await page.fill(`[name=text]`, nonce);
  await page.click(`form [type=submit]`);
  await page.waitForLoadState('networkidle');

  // load the page without js
  const ssrContext = await browser.newContext({
    javaScriptEnabled: false,
  });
  const ssrPage = await ssrContext.newPage();
  await ssrPage.goto('/');
  expect(await ssrPage.content()).toContain(nonce);
});
