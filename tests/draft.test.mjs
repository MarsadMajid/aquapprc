import { test } from "node:test";
import assert from "node:assert/strict";
import { restoreDraft, comparisonIds } from "../lib/draft.ts";
const line = {
  key: "one",
  productId: "pn20",
  size: "25 mm",
  pressure: "PN20",
  quantity: "5",
  unit: "metres",
};
test("restore rejects corrupt, future and removed data", () => {
  for (const raw of ["{broken", "null", '{"version":2,"lines":[]}'])
    assert.match(restoreDraft(raw, ["pn20"]).notice, /could not/);
  const result = restoreDraft(
    JSON.stringify({
      version: 1,
      lines: [line, { ...line, key: "two", productId: "removed" }, line],
    }),
    ["pn20"],
  );
  assert.deepEqual(result.lines, [line]);
  assert.match(result.notice, /invalid items/);
});
test("restoration preserves sizes and strips personal fields", () => {
  const result = restoreDraft(
    JSON.stringify({
      version: 1,
      lines: [
        { ...line, phone: "private" },
        { ...line, key: "two", size: "32 mm" },
      ],
    }),
    ["pn20"],
  );
  assert.equal(result.lines.length, 2);
  assert.equal(result.lines[1].size, "32 mm");
  assert.equal(result.lines[0].phone, undefined);
});
test("comparison validates unique ids and limits to three", () =>
  assert.deepEqual(comparisonIds("a,a,missing,b,c,d", ["a", "b", "c", "d"]), [
    "a",
    "b",
    "c",
  ]));
