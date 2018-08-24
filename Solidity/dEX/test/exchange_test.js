const Exchange = artifacts.require('./contracts/Exchange.sol');
const MyTokenA = artifacts.require('./contracts/MyTokenA.sol');
const MyTokenB = artifacts.require('./contracts/MyTokenB.sol');

contract('Exchange', (accounts) => {
    it('Maker and Taker exchange tokens', async () => {
        const exchange = await Exchange.deployed();
        const tokenA = await MyTokenA.deployed();
        const tokenB = await MyTokenB.deployed();

        const makerAddress = accounts[1];
        const takerAddress = accounts[2];

        const amountA = 100;
        const amountB = 500;

        // Given

        await tokenA.transfer(makerAddress, amountA);
        await tokenB.transfer(takerAddress, amountB);

        tokenA.balanceOf.call(makerAddress).then(balance => assert.equal(amountA, balance.valueOf()));
        tokenB.balanceOf.call(makerAddress).then(balance => assert.equal(0, balance.valueOf()));

        tokenA.balanceOf.call(takerAddress).then(balance => assert.equal(0, balance.valueOf()));
        tokenB.balanceOf.call(takerAddress).then(balance => assert.equal(amountB, balance.valueOf()));

        // When

        await tokenA.approve(exchange.address, amountA, { from: makerAddress });
        await exchange.participate(tokenA.address, amountA, { from: makerAddress });

        await tokenB.approve(exchange.address, amountB, { from: takerAddress });
        await exchange.participate(tokenB.address, amountB, { from: takerAddress });

        // Then

        tokenA.balanceOf.call(makerAddress).then(balance => assert.equal(0, balance.valueOf()));
        tokenB.balanceOf.call(makerAddress).then(balance => assert.equal(amountB, balance.valueOf()));

        tokenA.balanceOf.call(takerAddress).then(balance => assert.equal(amountA, balance.valueOf()));
        tokenB.balanceOf.call(takerAddress).then(balance => assert.equal(0, balance.valueOf()));
    });
});
