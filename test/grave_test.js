const GraveContract = artifacts.require("Grave");

contract("Grave", accounts => {
    const name = "name";
    const birth = -1518825600;
    const death = 1639958400;
    const portraitURL = "https://digital-graves/boo/bar"
    const inheritor = accounts[0];

    beforeEach(async() => {
        grave = await GraveContract.new(name, birth, death, portraitURL, inheritor);
    });

    describe("initialization", () => {
        it("name", async() => {
            const actual = await grave.name();
            assert.equal(actual, name, "names should match");
        });

        it("birth", async() => {
            const actual = await grave.birth();
            assert.equal(actual, birth, "birth should match");
        });

        it("death", async() => {
            const actual = await grave.death();
            assert.equal(actual, death, "death should match");
        });

        it("portraitURL", async() => {
            const actual = await grave.portraitURL();
            assert.equal(actual, portraitURL, "portraitURL should match");
        });

        it("owner(inheritor)", async() => {
            const actual = await grave.owner();
            assert.equal(actual, inheritor, "owner should match");
        });
    });

    describe("set portraitURL", async() => {
        const newPortraitURL = "https://digital-graves/hoge/piyo";

        it("updated portraitURL when called by inheritor account", async() => {
            try {
                await grave.setPortraitURL(newPortraitURL, {from: inheritor});
                const actual = await grave.portraitURL();
                assert.equal(actual, newPortraitURL, "portraitURL should match");
            } catch(err) {
                assert.fail("error shouldn't occur");
            }
        });

        it("throws an error when called from non-inheritor account", async() => {
            try {
                await grave.setPortraitURL(newPortraitURL, {from: accounts[1]});
                assert.fail("not restricted by inheritor");
            } catch(err) {
                const expectedError = "Ownable: caller is not the owner";
                const actualError = err.reason;
                assert.equal(actualError, expectedError, "should not be permitted");
            }
        });
    });

    describe("inherit", async() => {
        const newInheritor = accounts[2];

        it("inherit when called by inheritor account", async() => {
            try {
                await grave.inherit(newInheritor, {from: inheritor});
                const actual = await grave.owner();
                assert.equal(actual, newInheritor, "inheritor should match");
            } catch(err) {
                assert.fail("error shouldn't occur");
            }
        });

        it("throws an error when called from non-inheritor account", async() => {
            try {
                await grave.inherit(newInheritor, {from: accounts[1]});
                assert.fail("not restricted by inheritor");
            } catch(err) {
                const expectedError = "Ownable: caller is not the owner";
                const actualError = err.reason;
                assert.equal(actualError, expectedError, "should not be permitted");
            }
        });
    });
});