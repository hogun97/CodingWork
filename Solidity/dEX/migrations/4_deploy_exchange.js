const Exchange = artifacts.require('./Exchange.sol');

module.exports = function(deployer, network, accounts) {
    deployer.deploy(Exchange);
};
