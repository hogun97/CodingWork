const MyTokenA = artifacts.require('./MyTokenA.sol');
const MyTokenB = artifacts.require('./MyTokenB.sol');

module.exports = function(deployer, network, accounts) {
    deployer.deploy(MyTokenA);
    deployer.deploy(MyTokenB);
};
