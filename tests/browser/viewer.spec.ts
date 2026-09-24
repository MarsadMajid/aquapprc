import { test, expect } from "@playwright/test";
test("slow renderer retains its poster while loading", async ({ page }) => {
  await page.goto("/products/fiber-composite-pipe");
  await page.route("**/_next/static/chunks/**", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    await route.continue();
  });
  await page.getByRole("button", { name: "3D", exact: true }).click();
  await expect(page.locator(".loading-poster")).toBeVisible();
  await expect(page.locator(".viewer")).toHaveAttribute(
    "data-viewer-ready",
    "true",
  );
  await expect(page.locator(".loading-poster")).toHaveCount(0);
});
test.use({ launchOptions: { args: ["--enable-unsafe-swiftshader"] } });
test("stationary and offscreen viewers stop drawing", async ({ page }) => {
  await page.addInitScript(() => {
    const state = window as unknown as { drawCount: number };
    state.drawCount = 0;
    const original = WebGL2RenderingContext.prototype.drawElements;
    WebGL2RenderingContext.prototype.drawElements = function (
      this: WebGL2RenderingContext,
      ...args: Parameters<typeof original>
    ) {
      state.drawCount++;
      return original.apply(this, args);
    };
  });
  await page.goto("/products/pprc-pn20-pipe");
  await page.getByRole("button", { name: "3D", exact: true }).click();
  await expect(page.locator(".viewer")).toHaveAttribute(
    "data-viewer-ready",
    "true",
  );
  const count = () =>
    page.evaluate(() => (window as unknown as { drawCount: number }).drawCount);
  await expect.poll(count).toBeGreaterThan(0);
  await page.waitForTimeout(350);
  const stationary = await count();
  await page.waitForTimeout(350);
  expect(await count()).toBe(stationary);
  await page
    .getByRole("button", { name: "Start rotation", exact: true })
    .click();
  await expect.poll(count).toBeGreaterThan(stationary);
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect(page.locator(".viewer")).toHaveAttribute(
    "data-viewer-active",
    "false",
  );
  await page.waitForTimeout(350);
  const offscreen = await count();
  await page.waitForTimeout(350);
  expect(await count()).toBe(offscreen);
});
test("six models, controls, modes, reset and dialog", async ({
  page,
}, info) => {
  test.setTimeout(120000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const products = [
    ["pprc-pn20-pipe", "Section"],
    ["fiber-composite-pipe", "Layers"],
    ["90-degree-fusion-elbow", "Whole"],
    ["equal-fusion-tee", "Whole"],
    ["brass-threaded-socket", "Exploded"],
    ["pprc-ball-valve", "Closed"],
  ];
  for (const [slug, mode] of products) {
    await page.goto(`/products/${slug}`);
    await expect(page.locator("canvas")).toHaveCount(0);
    await page.getByRole("button", { name: "3D", exact: true }).click();
    await expect(page.locator("canvas")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Start rotation", exact: true }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Front", exact: true }).click();
    await page
      .getByRole("button", { name: "Zoom in", exact: true })
      .press("Enter");
    if (mode !== "Whole") {
      await page.getByRole("button", { name: mode, exact: true }).click();
      await expect(
        page.getByRole("button", { name: mode, exact: true }),
      ).toHaveAttribute("aria-pressed", "true");
    }
    await page.getByRole("button", { name: "Reset", exact: true }).click();
    await expect(
      page.getByRole("button", { name: "Isometric", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await page.getByRole("button", { name: "Expand product viewer" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.locator("canvas")).toHaveCount(1);
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: "Expand product viewer" }),
    ).toBeFocused();
    await page.getByRole("button", { name: "Image", exact: true }).click();
    await expect(page.locator("canvas")).toHaveCount(0);
  }
  await page.screenshot({
    path: `test-results/${info.project.name}-product.png`,
    fullPage: true,
  });
});
test("WebGL failure and context loss retain poster and inquiry", async ({
  page,
}) => {
  await page.goto("/products/pprc-pn20-pipe");
  await page.getByRole("button", { name: "3D", exact: true }).click();
  await expect(page.locator("canvas")).toBeVisible();
  await expect(page.locator(".viewer")).toHaveAttribute(
    "data-viewer-ready",
    "true",
  );
  await page
    .locator("canvas")
    .evaluate((el) =>
      el.dispatchEvent(new Event("webglcontextlost", { cancelable: true })),
    );
  await expect(
    page.getByText("3D is unavailable on this device.", { exact: false }),
  ).toBeVisible();
  await expect(page.locator(".detail-add")).toBeEnabled();
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      ...args: Parameters<typeof original>
    ) {
      if (args[0] === "webgl2") return null;
      return original.apply(this, args);
    } as typeof original;
  });
  await page.reload();
  await page.getByRole("button", { name: "3D", exact: true }).click();
  await expect(page.locator(".model-poster")).toBeVisible();
  await expect(
    page.getByText("3D is unavailable on this device.", { exact: false }),
  ).toBeVisible();
});
test("corrupt draft, copy fallback, email, download and print", async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem("galaxy-inquiry-v1", "broken");
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: () => Promise.reject(new Error("denied")) },
    });
  });
  await page.goto("/quote");
  await expect(page.locator(".toast")).toContainText("could not be restored");
  await page.getByRole("checkbox").check();
  await page.getByLabel("Name / company").fill("QA");
  await page.getByLabel("Phone / WhatsApp").fill("03001234567");
  await page.getByLabel("Delivery city").fill("Faisalabad");
  await page.getByLabel("Project notes").fill("Help selecting products");
  await page.getByRole("button", { name: "Review quote inquiry" }).click();
  await page.getByRole("button", { name: "Copy message" }).click();
  await expect(
    page.getByText("Select the message below and copy it manually."),
  ).toBeVisible();
  const msg = await page.getByLabel("Inquiry message").inputValue();
  const mail = await page
    .getByRole("link", { name: "Email draft" })
    .getAttribute("href");
  expect(new URL(mail!).searchParams.get("body")).toBe(msg);
  const downloaded = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download text" }).click();
  expect((await downloaded).suggestedFilename()).toBe("galaxy-inquiry.txt");
  await page
    .getByRole("button", { name: "Print inquiry", exact: true })
    .click();
  await page.emulateMedia({ media: "print" });
  await expect(page.getByRole("dialog")).toContainText(
    "Help selecting products",
  );
  await expect(page.locator("main")).toBeHidden();
});
