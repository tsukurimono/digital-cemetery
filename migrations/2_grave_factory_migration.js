const GraveFactoryContract = artifacts.require("GraveFactory");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(GraveFactoryContract, {from: accounts[0]});
};
