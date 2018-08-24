const Presale = artifacts.require('./Presale.sol'); 

module.exports = async (deployer) => {
    await deployer.deploy(Presale);
};
