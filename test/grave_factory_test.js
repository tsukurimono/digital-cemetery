const GraveFactoryContract = artifacts.require("GraveFactory");
const GraveContract = artifacts.require("Grave");

contract("GraveFactory: deployment", accounts => {
    it("has been deployed", async () => {
        const graveFactoryContract = await GraveFactoryContract.deployed();
        assert(graveFactoryContract, "was not deployed");
    });
});

contract("GraveFactory: operations", accounts => {
    const name = "name";
    const birth = -1518825600;
    const death = 1639958400;
    const portraitURL = "https://digital-graves/boo/bar"
    const epigraph = "epigraph"
    const sender = accounts[1];

    describe("creation", () => {
        it("associated graves count should increment by 1", async() => {
            const graveFactoryContract = await GraveFactoryContract.new();
            const currentAssociatedGravesCount = await graveFactoryContract.associatedGravesCount({from: sender});
            await graveFactoryContract.createGrave(name, birth, death, portraitURL, epigraph, {from: sender});
            const newAssociatedGravesCount = await graveFactoryContract.associatedGravesCount({from: sender});
            assert.equal(newAssociatedGravesCount - currentAssociatedGravesCount, 1, "should increment by 1")
        });

        it("emits the GraveCreated event", async() => {
            const graveFactoryContract = await GraveFactoryContract.new();
            const tx = await graveFactoryContract.createGrave(name, birth, death, portraitURL, epigraph, {from: sender});
            const expectedEvent = "GraveCreated";
            const actualEvent = tx.logs[0].event;
            assert.equal(actualEvent, expectedEvent, "events should match");
        });
    });

    async function createFactory(count, graveInheritor) {
        const factory = await GraveFactoryContract.new();
        await addGraves(factory, count, graveInheritor);
        return factory;
    }

    async function addGraves(factory, count, graveInheritor) {
        for(let i=0; i<count; i++) {
            await factory.createGrave(`${name} ${i}`, birth, death, `${portraitURL}/${i}`, `${epigraph} ${i}`, {from: graveInheritor});
        }
    }

    describe("varing limits", () => {
        let factory;
        const inheritor = accounts[1];

        beforeEach(async () => {
            factory = await createFactory(20, inheritor);
        });

        it("returns 10 results when limit request is 10", async() => {
            const graves = await factory.associatedGraves(10, 0, {from: inheritor});
            assert.equal(graves.length, 10, "results size should be 10");
        });

        it("returns 20 results when limit request is 20", async() => {
            const graves = await factory.associatedGraves(20, 0, {from: inheritor});
            assert.equal(graves.length, 20, "results size should be 20");
        });

        it("returns 30 results when limit request is 20", async() => {
            const graves = await factory.associatedGraves(30, 0, {from: inheritor});
            assert.equal(graves.length, 20, "results size should be 20");
        });
    });

    describe("varing offset", () => {
        let factory;
        const inheritor = accounts[1];

        beforeEach(async () => {
            factory = await createFactory(10, inheritor);
        });

        it("contains appropriate property: low boundary", async() => {
            const graves = await factory.associatedGraves(1, 0, {from: inheritor});
            const grave = await GraveContract.at(graves[0]);
            const actual = await grave.name();
            assert.equal(actual, `${name} 0`, "name should match");
        });

        it("contains appropriate property: start in the middle", async() => {
            const graves = await factory.associatedGraves(1, 1, {from: inheritor});
            const grave = await GraveContract.at(graves[0]);
            const actual = await grave.name();
            assert.equal(actual, `${name} 1`, "name should match");
        });

        it("contains appropriate property: end at just high boundary", async() => {
            const graves = await factory.associatedGraves(9, 1, {from: inheritor});
            const grave = await GraveContract.at(graves[graves.length-1]);
            const actual = await grave.name();
            assert.equal(actual, `${name} 9`, "name should match");
        });

        it("contains appropriate property: exceeds high boundary", async() => {
            const graves = await factory.associatedGraves(10, 5, {from: inheritor});
            const grave = await GraveContract.at(graves[graves.length-1]);
            const actual = await grave.name();
            assert.equal(actual, `${name} 9`, "name should match");
        });
    });

    describe("associateGrave", () => {
        let factory;
        const inheritor = accounts[1];
        const associateAccount = accounts[2];

        beforeEach(async () => {
            factory = await createFactory(1, inheritor);
        });

        it("associated graves count should increment by 1", async () => {
            const graves = await factory.associatedGraves(1, 0, {from: inheritor});
            const currentAssociatedGravesCount = await factory.associatedGravesCount({from: associateAccount});
            await factory.associateGrave(graves[0], {from: associateAccount});
            const newAssociatedGravesCount = await factory.associatedGravesCount({from: associateAccount});
            assert.equal(1, newAssociatedGravesCount - currentAssociatedGravesCount, "should increment by 1");
        });

        it("inheritor's association still remain", async () => {
            const graves = await factory.associatedGraves(1, 0, {from: inheritor});
            const currentAssociatedGravesCount = await factory.associatedGravesCount({from: inheritor});
            await factory.associateGrave(graves[0], {from: associateAccount});
            const newAssociatedGravesCount = await factory.associatedGravesCount({from: inheritor});
            assert.equal(0, newAssociatedGravesCount - currentAssociatedGravesCount, "should be same");
        });
    });

    describe("unassociateGrave", () => {
        let factory;
        const totalCount = 10;
        const inheritor = accounts[1];
        const otherAccount = accounts[2];

        beforeEach(async () => {
            factory = await createFactory(totalCount, inheritor);
        });

        it("associated graves count should decrement by 1", async () => {
            const graves = await factory.associatedGraves(1, 0, {from: inheritor});
            const currentAssociatedGravesCount = await factory.associatedGravesCount({from: inheritor});
            await factory.unassociateGrave(graves[0], {from: inheritor});
            const newAssociatedGravesCount = await factory.associatedGravesCount({from: inheritor});
            assert.equal(1, currentAssociatedGravesCount - newAssociatedGravesCount, "should decrement by 1");
        });

        it("other graves keep their order", async () => {
            const removeIndex = 3;
            const associatedGraves = await factory.associatedGraves(totalCount, 0, {from: inheritor});
            await factory.unassociateGrave(associatedGraves[removeIndex], {from: inheritor});
            const expected = associatedGraves.filter(val => val != associatedGraves[removeIndex]);
            const actual = await factory.associatedGraves(totalCount, 0, {from: inheritor});

            assert.equal(actual.length, expected.length, "element count should be equal");
            for(let i=0; i<expected.length; i++) { 
                assert.equal(actual[i], expected[i], "each element and order should be same");
            }
        });

        it("last grave", async () => {
            const removeIndex = totalCount - 1;
            const associatedGraves = await factory.associatedGraves(totalCount, 0, {from: inheritor});
            await factory.unassociateGrave(associatedGraves[removeIndex], {from: inheritor});
            const expected = associatedGraves.slice(0, -1);
            const actual = await factory.associatedGraves(totalCount, 0, {from: inheritor});

            assert.equal(actual.length, expected.length, "element count should be equal");
            for(let i=0; i<expected.length; i++) { 
                assert.equal(actual[i], expected[i], "each element and order should be same");
            }
        });

        it("grave is not associated", async () => {
            await factory.createGrave(name, birth, death, portraitURL, epigraph, {from: otherAccount});
            const notAssocitedGraves = await factory.associatedGraves(totalCount, 0, {from: otherAccount});
            const currentAssociatedGravesCount = await factory.associatedGravesCount({from: inheritor});
            await factory.unassociateGrave(notAssocitedGraves[0], {from: inheritor});
            const newAssociatedGravesCount = await factory.associatedGravesCount({from: inheritor});
            assert.equal(0, newAssociatedGravesCount - currentAssociatedGravesCount, "should be same");
        });

        it("other association still remain", async () => {
            const graves = await factory.associatedGraves(1, 0, {from: inheritor});
            await factory.associateGrave(graves[0], {from: otherAccount});
            const currentAssociatedGravesCount = await factory.associatedGravesCount({from: otherAccount});
            await factory.unassociateGrave(graves[0], {from: inheritor});
            const newAssociatedGravesCount = await factory.associatedGravesCount({from: otherAccount});
            assert.equal(0, newAssociatedGravesCount - currentAssociatedGravesCount, "should be same");
        });
    });
});