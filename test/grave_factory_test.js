const GraveFactoryContract = artifacts.require("GraveFactory");

contract("GraveFactory: deployment", accounts => {
    const owner = accounts[0]; // Note: Owner should be same as migration file.

    it("has been deployed", async () => {
        const graveFactoryContract = await GraveFactoryContract.deployed();
        assert(graveFactoryContract, "was not deployed");
    });

    describe("initialize", () => {
        it("owner", async() => { 
            const graveFactoryContract = await GraveFactoryContract.deployed();
            const actual = await graveFactoryContract.owner();
            assert.equal(actual, owner, "owner should match");
        });
    });
});