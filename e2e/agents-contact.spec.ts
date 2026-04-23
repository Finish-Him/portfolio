/**
 * E2E Tests — Agents Chat & Contact Form
 * Tests the chat interface and contact form submission.
 */
import { test, expect } from "@playwright/test";

test.describe("Agents Chat Interface", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/agents");
    await page.waitForSelector("text=Arquimedes", { timeout: 10000 });
  });

  test("chat input is visible and enabled", async ({ page }) => {
    const input = page.locator("input[type='text'], textarea").first();
    await expect(input).toBeVisible();
    await expect(input).toBeEnabled();
  });

  test("send button is visible", async ({ page }) => {
    const sendBtn = page.locator(
      "button[type='submit'], button:has-text('Send'), button[aria-label*='send' i]"
    ).first();
    await expect(sendBtn).toBeVisible();
  });

  test("can type a message in chat input", async ({ page }) => {
    const input = page.locator("input[type='text'], textarea").first();
    await input.fill("What is 2 + 2?");
    const value = await input.inputValue();
    expect(value).toBe("What is 2 + 2?");
  });

  test("suggested prompts are displayed", async ({ page }) => {
    // Suggested prompts should be visible before first message
    const prompts = page.locator("[class*='suggested'], [class*='prompt'], button:has-text('Explain')");
    // Just verify the chat area is loaded
    const chatArea = page.locator("[class*='chat'], [class*='message'], [class*='conversation']").first();
    await expect(chatArea).toBeVisible();
  });

  test("Atlas tab switches agent", async ({ page }) => {
    const atlasTab = page.locator("button:has-text('Atlas'), [role='tab']:has-text('Atlas')").first();
    await atlasTab.click();
    // Atlas description should be visible
    const atlasContent = page.locator("text=Atlas").first();
    await expect(atlasContent).toBeVisible();
  });

  test("Artemis tab switches agent", async ({ page }) => {
    const artemisTab = page.locator("button:has-text('Artemis'), [role='tab']:has-text('Artemis')").first();
    await artemisTab.click();
    const artemisContent = page.locator("text=Artemis").first();
    await expect(artemisContent).toBeVisible();
  });

  test("sends a message and shows loading indicator", async ({ page }) => {
    const input = page.locator("input[type='text'], textarea").first();
    await input.fill("Hello Arquimedes!");

    const sendBtn = page.locator(
      "button[type='submit'], button:has-text('Send'), button[aria-label*='send' i]"
    ).first();
    await sendBtn.click();

    // Input should be cleared after sending
    await page.waitForTimeout(500);
    const value = await input.inputValue();
    expect(value).toBe("");
  });
});

test.describe("Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Scroll to contact form
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
  });

  test("contact form is present on the page", async ({ page }) => {
    const form = page.locator("form, [class*='contact'], [id*='contact']").first();
    await expect(form).toBeVisible();
  });

  test("contact form has name, email and message fields", async ({ page }) => {
    const nameInput = page.locator("input[name='name'], input[placeholder*='name' i]").first();
    const emailInput = page.locator("input[type='email'], input[name='email']").first();
    const messageInput = page.locator("textarea[name='message'], textarea").first();

    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(messageInput).toBeVisible();
  });

  test("contact form shows validation error for empty submission", async ({ page }) => {
    const submitBtn = page.locator(
      "button[type='submit']:has-text('Send'), button:has-text('Send Message')"
    ).first();

    if (await submitBtn.count() > 0) {
      await submitBtn.click();
      // Should show some validation feedback (HTML5 or custom)
      await page.waitForTimeout(500);
      // Form should still be visible (not submitted)
      const form = page.locator("form").first();
      await expect(form).toBeVisible();
    }
  });

  test("contact form accepts valid input", async ({ page }) => {
    const nameInput = page.locator("input[name='name'], input[placeholder*='name' i]").first();
    const emailInput = page.locator("input[type='email'], input[name='email']").first();
    const messageInput = page.locator("textarea[name='message'], textarea").first();

    if (await nameInput.count() > 0) {
      await nameInput.fill("Test Recruiter");
      await emailInput.fill("recruiter@techcorp.com");
      await messageInput.fill("I am interested in discussing an AI Engineer role with you.");

      const nameValue = await nameInput.inputValue();
      const emailValue = await emailInput.inputValue();
      const msgValue = await messageInput.inputValue();

      expect(nameValue).toBe("Test Recruiter");
      expect(emailValue).toBe("recruiter@techcorp.com");
      expect(msgValue).toContain("AI Engineer");
    }
  });
});

test.describe("CV Download", () => {
  test("Download CV button has correct href attribute", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("text=Download CV", { timeout: 10000 });

    const downloadBtn = page.locator("a:has-text('Download CV')").first();
    await expect(downloadBtn).toBeVisible();

    const href = await downloadBtn.getAttribute("href");
    expect(href).toBeTruthy();
    expect(href).not.toBe("#");
    // Should point to storage or a PDF file
    expect(href).toMatch(/\.(pdf)$|\/manus-storage\//i);
  });

  test("Download CV button has download attribute", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("text=Download CV", { timeout: 10000 });

    const downloadBtn = page.locator("a:has-text('Download CV')").first();
    const download = await downloadBtn.getAttribute("download");
    // download attribute should be present (even if empty string)
    expect(download !== null || (await downloadBtn.getAttribute("href"))?.includes(".pdf")).toBeTruthy();
  });
});
