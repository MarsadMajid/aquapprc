import { test, expect } from "@playwright/test";
test("360px and tablet layouts plus legacy links", async ({ page }) => {
  for (const width of [360, 768]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of [
      "/",
      "/products",
      "/products/fiber-composite-pipe",
      "/quote",
      "/locations/factory",
    ]) {
      await page.goto(path);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  }
  await page.goto("/#products");
  await expect(page).toHaveURL(/\/products$/);
});
test("catalogue, printable sheet and responsive homepage", async ({
  page,
}, info) => {
  await page.goto("/products");
  await expect(page.locator(".product-card")).toHaveCount(6);
  await page.getByRole("button", { name: "fittings 3", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(3);
  await page.getByRole("searchbox").fill("nonexistent");
  await expect(page.getByText("No matching products")).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.locator(".product-card")).toHaveCount(6);
  await page.goto("/products/pprc-ball-valve");
  await page.getByRole("button", { name: "Print product sheet" }).click();
  await expect(page.getByRole("dialog")).toContainText("PPRC ball valve");
  await page.emulateMedia({ media: "print" });
  await expect(page.locator("main")).toBeHidden();
  await page.emulateMedia({ media: "screen" });
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Print product sheet" }),
  ).toBeFocused();
  await page.goto("/");
  for (const img of await page.locator("main img").all()) {
    await img.scrollIntoViewIfNeeded();
    await expect
      .poll(() => img.evaluate((el) => (el as HTMLImageElement).naturalWidth))
      .toBeGreaterThan(0);
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(
    await page
      .locator(".site-header")
      .evaluate((el) => getComputedStyle(el).backgroundColor),
  ).toBe("rgb(30, 41, 59)");
  expect(
    await page
      .locator(".site-header")
      .evaluate((el) => getComputedStyle(el).backdropFilter),
  ).toBe("none");
  await page.evaluate(() => scrollTo(0, 0));
  await page.screenshot({
    path: `test-results/${info.project.name}-home.png`,
    fullPage: true,
  });
});
test("persistent inquiry and private contacts", async ({ page }) => {
  await page.goto("/products/fiber-composite-pipe");
  await page.getByLabel("Requested size").fill("32 mm");
  await page.getByLabel("Quantity", { exact: true }).fill("250");
  await page.locator(".detail-add").click();
  await page
    .locator(".toast")
    .getByRole("link", { name: "View inquiry" })
    .click();
  await expect(page.getByLabel("Size / thread")).toHaveValue("32 mm");
  await page.getByRole("button", { name: "Duplicate item 1" }).click();
  await page.getByLabel("Size / thread").nth(1).fill("25 mm");
  await page.getByLabel("Name / company").fill("QA Company");
  await page.getByLabel("Phone / WhatsApp").fill("03001234567");
  await page.getByLabel("Delivery city").fill("Faisalabad");
  await page.getByRole("button", { name: "Review quote inquiry" }).click();
  const msg = await page.getByLabel("Inquiry message").inputValue();
  expect(msg).toContain("32 mm");
  expect(msg).toContain("25 mm");
  const href = await page
    .getByRole("link", { name: "Continue to WhatsApp" })
    .getAttribute("href");
  expect(new URL(href!).searchParams.get("text")).toBe(msg);
  expect(
    await page.evaluate(() => localStorage.getItem("galaxy-inquiry-v1")),
  ).not.toContain("QA Company");
  await page.reload();
  await expect(page.getByLabel("Size / thread")).toHaveCount(2);
  await expect(page.getByLabel("Name / company")).toHaveValue("");
  await page.getByRole("button", { name: "Remove item 1" }).click();
  await expect(page.getByLabel("Size / thread")).toHaveValue("25 mm");
});
test("shareable comparison limit", async ({ page }) => {
  await page.goto("/compare?ids=pn20,fiber,tee,valve,missing");
  await expect(page.locator("thead th")).toHaveCount(4);
  await expect(page.getByLabel("Add a product to compare")).toHaveCount(0);
  await page.getByRole("button", { name: "Remove Equal fusion tee" }).click();
  await page.getByLabel("Add a product to compare").selectOption("valve");
  await expect(page).toHaveURL(/ids=pn20,fiber,valve/);
  await page.reload();
  await expect(page.locator("thead")).toContainText("PPRC ball valve");
});
test("finder carries requirements", async ({ page }) => {
  await page.goto("/product-finder");
  await page.getByRole("button", { name: "Heating", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page
    .getByRole("button", { name: "Branch fitting", exact: true })
    .click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel("Size / thread").fill("25 mm");
  await page.getByLabel("Quantity", { exact: true }).fill("100");
  await page.getByLabel("Documents required").fill("Approved dimensions");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Add with requirements" }).click();
  await page.getByRole("link", { name: "Continue to inquiry" }).click();
  await expect(page.getByLabel("Size / thread")).toHaveValue("25 mm");
  await expect(page.getByLabel("Project notes")).toHaveValue(
    /Heating.*Approved dimensions/,
  );
  await expect(page.getByLabel("Pressure class")).toHaveValue(
    "Confirm with factory",
  );
});
test("unavailable storage is tolerated", async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => {
      throw new Error("blocked");
    };
    Storage.prototype.setItem = () => {
      throw new Error("blocked");
    };
  });
  await page.goto("/quote");
  await expect(page.locator(".toast")).toContainText("storage is unavailable");
  await page.getByRole("button", { name: "Add product", exact: true }).click();
  await expect(page.getByLabel("Size / thread")).toHaveCount(1);
});
test("exact locations and lazy maps", async ({ page }) => {
  for (const [slug, coords] of [
    ["factory", "31.5004234,73.1084974"],
    ["asia-pipe-store", "31.4171743,73.0856842"],
  ]) {
    await page.goto(`/locations/${slug}`);
    await expect(page.locator("iframe")).toHaveCount(0);
    await expect(
      page.getByRole("link", { name: "Get directions" }),
    ).toHaveAttribute(
      "href",
      `https://www.google.com/maps/dir/?api=1&destination=${coords}`,
    );
    await page.route("https://www.google.com/maps/embed**", (route) =>
      route.abort(),
    );
    await page
      .getByRole("button", { name: "Load interactive Google map" })
      .click();
    await expect(page.locator("iframe")).toHaveAttribute("src", /maps/);
    await expect(
      page.getByRole("link", { name: "Get directions" }),
    ).toBeVisible();
  }
});
test("routes, 404, dealership and mobile menu", async ({ page }, info) => {
  for (const path of [
    "/",
    "/factory",
    "/technical",
    "/dealership",
    "/locations",
    "/quote",
  ]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  const response = await page.goto("/products/does-not-exist");
  expect(response?.status()).toBe(404);
  await page.goto("/dealership");
  await page.getByLabel("Business name").fill("QA Dealer");
  await page.getByLabel("Contact person").fill("Test Contact");
  await page.getByLabel("Phone / WhatsApp").fill("03001234567");
  await page.getByLabel("City / territory").fill("Lahore");
  await page.getByLabel("Business type").selectOption("Wholesaler");
  await page.getByRole("button", { name: "Review dealership inquiry" }).click();
  await expect(page.getByLabel("Inquiry message")).toHaveValue(/Wholesaler/);
  if (info.project.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await page
      .locator("#mobile-menu")
      .getByRole("link", { name: "Products", exact: true })
      .click();
    await expect(page).toHaveURL(/products$/);
    await expect(page.locator("#mobile-menu")).toHaveCount(0);
  }
});
