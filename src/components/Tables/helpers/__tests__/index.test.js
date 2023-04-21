import * as helpers from "../";

describe("imports", () => {
    // iterate over the keys of the imported object and test each one to be instance of a function
    Object.keys(helpers).forEach((key) => {
        it(`should import ${key} and return a function`, () => {
            const func = helpers[key];

            expect(func).toBeInstanceOf(Function);
        });
    });
});
