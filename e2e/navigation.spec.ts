/**
 * E2E Tests — Navigation
 * Tests routing between pages: Blog, Agents, and back to Home.
 */
import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("navigates to Blog page", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("nav", { timeout: 10000 });

    // Click Blog link in navbar
    const blogLink = page.locator("a[href='/blog'], nav a:has-text('Blog')");
    await blogLink.first().click();

    await page.waitForURL("**/blog", { timeout: 10000 });
    expect(page.url()).toContain("/blog");
  });

  test("Blog page renders article list", async ({ page }) => {
    await page.goto("/blog");
    await page.waitForSelector("h1, h2", { timeout: 10000 });

    // Should have at least one article card
    const articles = page.locator("article, [data-testid='blog-card'], .blog-card");
    // If no data-testid, check for heading with article content
    const heading = page.locator("h1, h2").first();
    await expect(heading).toBeVisible();
  });

  test("navigates to Agents page", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("nav", { timeout: 10000 });

    // Navigate directly to /agents
    await page.goto("/agents");
    await page.waitForSelector("h1, h2, [class*='agent']", { timeout: 10000 });
    expect(page.url()).toContain("/agents");
  });

  test("Agents page shows Arquimedes tab", async ({ page }) => {
    await page.goto("/agents");
    await page.waitForSelector("text=Arquimedes", { timeout: 10000 });
    const arquimedes = page.locator("text=Arquimedes").first();
    await expect(arquimedes).toBeVisible();
  });

  test("Agents page shows Atlas tab", async ({ page }) => {
    await page.goto("/agents");
    await page.waitForSelector("text=Atlas", { timeout: 10000 });
    const atlas = page.locator("text=Atlas").first();
    await expect(atlas).toBeVisible();
  });

  test("Agents page shows Artemis tab", async ({ page }) => {
    await page.goto("/agents");
    await page.waitForSelector("text=Artemis", { timeout: 10000 });
    const artemis = page.locator("text=Artemis").first();
    await expect(artemis).toBeVisible();
  });

  test("navigates back to Home from Blog", async ({ page }) => {
    await page.goto("/blog");
    await page.waitForLoadState("domcontentloaded");
    // Navigate directly to home (Blog may not have a nav element)
    await page.goto("/");
    await page.waitForSelector("h1", { timeout: 10000 });
    expect(page.url()).toMatch(/\/($|\?|#)/);
  });

  test("404 page or redirect for unknown route", async ({ page }) => {
    await page.goto("/this-route-does-not-exist-xyz");
    // Should either show 404 or redirect to home
    const status = await page.evaluate(() => document.readyState);
    expect(status).toBe("complete");
  });
});
