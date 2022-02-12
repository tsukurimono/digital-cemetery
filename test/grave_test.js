const GraveContract = artifacts.require("Grave");

contract("Grave", accounts => {
    const name = "name";
    const birth = -1518825600;
    const death = 1639958400;
    const portraitURL = "https://digital-graves/boo/bar"

    beforeEach(async() => {
        grave = await GraveContract.new(name, birth, death, portraitURL);
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
    });
});