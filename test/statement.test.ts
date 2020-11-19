import { statement } from "../src/statement";
import { invoice, plays } from "./data";

describe("statement", function () {
  test("renderPlainText", () => {
    const actual = statement(invoice, plays);
    const expected = `Statement for BigCo
  Hamlet: $650.00 (55 seats)
  As You Like It: $580.00 (35 seats)
  Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
`;
    expect(actual).toEqual(expected);
  });
});
