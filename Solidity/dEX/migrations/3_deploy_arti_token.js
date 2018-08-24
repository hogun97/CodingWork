const ArtiToken = artifacts.require('./ArtiToken.sol');

module.exports = function(deployer, network, accounts) {
    deployer.deploy(ArtiToken);
};
