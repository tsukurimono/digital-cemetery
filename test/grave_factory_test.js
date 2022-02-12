const GraveFactoryContract = artifacts.require("GraveFactory");

contract("GraveFactory: deployment", accounts => {
    const owner = accounts[0];

    it("has been deployed", async () => {
        const graveFactoryContract = await GraveFactoryContract.deployed();
        assert(graveFactoryContract, "was not deployed");
    });

    describe("initialize", () => {
        it("owner", async() => { 
            const graveFactoryContract = await GraveFactoryContract.new({from:owner});
            const actual = await graveFactoryContract.owner();
            assert.equal(actual, owner, "owner should match");
        });
    });
});

contract("GraveFactory: operations", accounts => {
    const name = "name";
    const birth = -1518825600;
    const death = 1639958400;
    const portraitURL = "https://digital-graves/boo/bar"
    const sender = accounts[1];
    const owner = accounts[0];

    describe("creation", () => {
        it("associated graves count should increment by 1", async() => {
            const graveFactoryContract = await GraveFactoryContract.new({from: owner});
            const currentAssociatedGravesCount = await graveFactoryContract.associatedGravesCount({from: sender});
            await graveFactoryContract.createGrave(name, birth, death, portraitURL, {from: sender});
            const newAssociatedGravesCount = await graveFactoryContract.associatedGravesCount({from: sender});
            assert.equal(newAssociatedGravesCount - currentAssociatedGravesCount, 1, "should increment by 1")
        });
    });

    async function createFactory(count, graveInheritor, factoryOwner) {
        const factory = await GraveFactoryContract.new({from: factoryOwner});
        await addGraves(factory, count, graveInheritor);
        return factory;
    }

    async function addGraves(factory, count, graveInheritor) {
        for(let i=0; i<count; i++) {
            await factory.createGrave(`${name} ${i}`, birth, death, `${portraitURL}/${i}`, {from: graveInheritor});
        }
    }

    describe("varing limits", () => {
        let factory;
        const inheritor = accounts[1];
        const factoryOwner = accounts[0];

        beforeEach(async () => {
            factory = await createFactory(20, inheritor, factoryOwner);
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

});