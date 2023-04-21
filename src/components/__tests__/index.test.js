import * as components from "../";

describe("imports", () => {
    // iterate over the keys of the imported object and test each one to be instance of a function
    Object.keys(components).forEach((key) => {
        it(`should import ${key} and return a function`, () => {
            const func = components[key];

            expect(func).toBeInstanceOf(Function);
        });
    });
});
