const GraveFactoryContract = artifacts.require("GraveFactory");

module.exports = function (deployer) {
  deployer.deploy(GraveFactoryContract);
};
