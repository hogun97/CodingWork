const ArtiToken = artifacts.require('ArtiToken');

contract('ArtiToken', async (accounts) => {
    it('should put 100 million tokens in the first account', async() => {
        const decimals = 8;

        const artiToken = await ArtiToken.deployed();
        const balance = await artiToken.balanceOf.call(accounts[0]);

        assert.equal(10000 * 10000 * Math.pow(10, decimals), balance.toNumber())
    });

    it('should transfer tokens correctly', async() => {
        const accountA = accounts[0];
        const accountB = accounts[1];
        const amount = 100;

        const artiToken = await ArtiToken.deployed();

        const balanceA = await artiToken.balanceOf.call(accountA);
        const balanceB = await artiToken.balanceOf.call(accountB);

        await artiToken.transfer(accountB, amount, { from: accountA });

        let balance;

        balance = await artiToken.balanceOf.call(accountA);
        assert.equal(balanceA.toNumber() - amount, balance.toNumber());

        balance = await artiToken.balanceOf.call(accountB);
        assert.equal(balanceB.toNumber() + amount, balance.toNumber());
    });
});
