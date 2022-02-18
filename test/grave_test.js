const GraveContract = artifacts.require("Grave");
const truffleAssert = require('truffle-assertions');

contract("Grave", accounts => {
    let grave;

    const name = "name";
    const birth = -1518825600;
    const death = 1639958400;
    const portraitURL = "https://digital-graves/boo/bar"
    const epigraph = "epigraph"
    const inheritor = accounts[0];

    beforeEach(async() => {
        grave = await GraveContract.new(name, birth, death, portraitURL, epigraph, inheritor);
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

        it("epigraph", async() => {
            const actual = await grave.epigraph();
            assert.equal(actual, epigraph, "epigraph should match");
        });

        it("prayed", async() => {
            const actual = await grave.prayed();
            assert.equal(actual, 0, "prayed should be zero");
        });

        it("inheritor", async() => {
            const actual = await grave.inheritor();
            assert.equal(actual, inheritor, "inheritor should match");
        });

        it("successor", async() => {
            const actual = await grave.successor();
            assert.equal(actual, inheritor, "successor should be same as inheritor");
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
                const expectedError = "Grave: caller is not the inheritor";
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

    describe("set epigraph", async() => {
        const newEpigraph = "new epigraph";

        it("updated epigraph when called by inheritor account", async() => {
            try {
                await grave.setEpigraph(newEpigraph, {from: inheritor});
                const actual = await grave.epigraph();
                assert.equal(actual, newEpigraph, "epigraph should match");
            } catch(err) {
                assert.fail("error shouldn't occur");
            }
        });

        it("throws an error when called from non-inheritor account", async() => {
            try {
                await grave.setEpigraph(newEpigraph, {from: accounts[1]});
                assert.fail("not restricted by inheritor");
            } catch(err) {
                const expectedError = "Grave: caller is not the inheritor";
                const actualError = err.reason;
                assert.equal(actualError, expectedError, "should not be permitted");
            }
        });

        it("emits EpigraphUpdated event", async() => {
            const tx = await grave.setEpigraph(newEpigraph, {from: inheritor});
            const expectedEvent = "EpigraphUpdated";
            const actualEvent = tx.logs[0].event;
            assert.equal(actualEvent, expectedEvent, "events should match");
        });
    });

    describe("nominate", async() => {
        const successor = accounts[2];

        it("nominate when called by inheritor", async() => {
            try {
                await grave.nominate(successor, {from: inheritor});
                assert.equal(await grave.inheritor(), inheritor, "inheritor shouldn't be changed");

                assert.equal(await grave.successor(), successor, "successor should match");
            } catch(err) {
                assert.fail("error shouldn't occur");
            }
        });

        it("throws an error when called from non-inheritor", async() => {
            try {
                await grave.nominate(successor, {from: accounts[1]});
                assert.fail("not restricted by inheritor");
            } catch(err) {
                const expectedError = "Grave: caller is not the inheritor";
                const actualError = err.reason;
                assert.equal(actualError, expectedError, "should not be permitted");
            }
        });

        it("emits Nominate event", async() => {
            const tx = await grave.nominate(successor, {from: inheritor});

            const expectedEvent = "Nominated";
            const actualEvent = tx.logs[0].event;
            assert.equal(actualEvent, expectedEvent, "events should match");
        });
    });

    describe("inherit", async() => {
        const successor = accounts[2];

        it("inherit when called by successor", async() => {
            try {
                await grave.nominate(successor, {from: inheritor});
                await grave.inherit({from: successor});

                assert.equal(await grave.inheritor(), successor, "inheritor should match");
            } catch(err) {
                assert.fail("error shouldn't occur");
            }
        });

        it("throws an error when called from non-successor", async() => {
            try {
                await grave.nominate(successor, {from: inheritor});
                await grave.inherit({from: accounts[3]});
                assert.fail("not restricted by successor");
            } catch(err) {
                const expectedError = "Grave: caller is not the successor";
                const actualError = err.reason;
                assert.equal(actualError, expectedError, "should not be permitted");
            }
        });

        it("emits Inherited event", async() => {
            await grave.nominate(successor, {from: inheritor});
            const tx = await grave.inherit({from: successor});

            const expectedEvent = "Inherited";
            const actualEvent = tx.logs[0].event;
            assert.equal(actualEvent, expectedEvent, "events should match");
        });
    });

    describe("pray", async() => {
        it("pray by inheritor", async() => {
            const currentPrayed = await grave.prayed();
            await grave.pray({from: inheritor});
            const newPrayed = await grave.prayed();
            assert.equal(1, newPrayed - currentPrayed, "should be incremented by 1");
        });

        it("pray by others", async() => {
            const currentPrayed = await grave.prayed();
            await grave.pray({from: accounts[2]});
            const newPrayed = await grave.prayed();
            assert.equal(1, newPrayed - currentPrayed, "should be incremented by 1");
        });

        it("emits Prayed event", async() => {
            const tx = await grave.pray({from: inheritor});
            const expectedEvent = "Prayed";
            const actualEvent = tx.logs[0].event;
            assert.equal(actualEvent, expectedEvent, "events should match");
        });
    });
});