import { formatDate, getTopProducts } from "../";

describe("imports", () => {
  it("should import formatDate and return a function", () => {
    const func = formatDate;

    expect(func).toBeInstanceOf(Function);
  });

  it("should import getTopProducts and return a function", () => {
    const func = getTopProducts;

    expect(func).toBeInstanceOf(Function);
  });
});
