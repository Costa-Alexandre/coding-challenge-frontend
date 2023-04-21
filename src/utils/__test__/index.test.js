import * as utils from "../";

describe("imports", () => {
    // iterate over the keys of the imported object and test each one to be instance of a function
    Object.keys(utils).forEach((key) => {
        it(`should import ${key} and return a function`, () => {
            const func = utils[key];

            expect(func).toBeInstanceOf(Function);
        });
    });
});
