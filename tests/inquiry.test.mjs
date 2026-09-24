import test from "node:test";
import assert from "node:assert/strict";
import { validateQuote, buildQuote, whatsappUrl } from "../lib/inquiry.ts";
const customer = {
  name: "Test & Sons",
  phone: "+92 300 1234567",
  city: "Faisalabad",
  notes: "Need DIN documents & delivery details",
};
const line = {
  key: "1",
  productId: "pn20",
  size: "25 mm",
  pressure: "PN20",
  quantity: "100",
  unit: "metres",
};
test("requires contact details and at least one item", () => {
  assert.match(validateQuote(customer, []), /at least one/);
  assert.match(validateQuote({ ...customer, name: " " }, [line]), /name/);
  assert.match(validateQuote({ ...customer, phone: "123" }, [line]), /phone/);
});
test("rejects missing sizes, nonpositive quantities and fractional pieces", () => {
  for (const quantity of ["", "0", "-5", "NaN", "Infinity"]) {
    assert.notEqual(validateQuote(customer, [{ ...line, quantity }]), "");
  }
  assert.notEqual(validateQuote(customer, [{ ...line, size: " " }]), "");
  assert.notEqual(
    validateQuote(customer, [{ ...line, unit: "pieces", quantity: "1.5" }]),
    "",
  );
  assert.equal(validateQuote(customer, [{ ...line, quantity: "1.5" }]), "");
});
test("multi-item messages preserve products, units, notes and user punctuation", () => {
  const second = {
    ...line,
    key: "2",
    productId: "tee",
    quantity: "75",
    unit: "pieces",
    pressure: "Confirm with factory",
  };
  assert.equal(validateQuote(customer, [line, second]), "");
  const message = buildQuote(customer, [line, second], {
    pn20: "PN20 pipe",
    tee: "Equal tee",
  });
  assert.match(message, /1\. PN20 pipe/);
  assert.match(message, /2\. Equal tee/);
  assert.match(message, /100 metres/);
  assert.match(message, /75 pieces/);
  assert.match(message, /Test & Sons/);
  assert.match(message, /DIN documents & delivery/);
});
test("WhatsApp draft has normalized phone and lossless message encoding", () => {
  const message = "A & B\nSize 25 mm #1";
  const url = new URL(whatsappUrl("+92 300 1234567", message));
  assert.equal(url.pathname, "/923001234567");
  assert.equal(url.searchParams.get("text"), message);
  assert.equal(whatsappUrl("", message), "");
  assert.equal(whatsappUrl("123", message), "");
});
