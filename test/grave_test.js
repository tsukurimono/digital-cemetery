const GraveContract = artifacts.require("Grave");
const truffleAssert = require('truffle-assertions');

contract("Grave", accounts => {
    let grave;

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

        it("emits the Created event", async() => {
            const txHash = grave.transactionHash;
            const txResult = await truffleAssert.createTransactionResult(grave, txHash);
            truffleAssert.eventEmitted(txResult, "Created");
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

        it("emits PortraitUpdated event", async() => {
            const tx = await grave.setPortraitURL(newPortraitURL, {from: inheritor});
            const expectedEvent = "PortraitUpdated";
            const actualEvent = tx.logs[0].event;
            assert.equal(actualEvent, expectedEvent, "events should match");
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

        it("emits Inherited event", async() => {
            const tx = await grave.inherit(newInheritor, {from: inheritor});

            const expectedEvent0 = "OwnershipTransferred";
            const actualEvent0 = tx.logs[0].event;
            assert.equal(actualEvent0, expectedEvent0, "events should match");

            const expectedEvent1 = "Inherited";
            const actualEvent1 = tx.logs[1].event;
            assert.equal(actualEvent1, expectedEvent1, "events should match");
        });
    });
});