const { eth, toWei, BigNumber } = web3;

const Presale = artifacts.require('Presale');

contract('Presale', ([owner, investor, investor2]) => {
    const AMOUNT = new BigNumber(toWei(1));
    const CAP = new BigNumber(toWei(150));

    beforeEach(async () => {
        this.ico = await Presale.new({ from: owner });
    });

    describe('sendTransaction', () => {
        describe('investors not on whitelist', () => {
            it('should not reserve tokens', async () => {
                try {
                    await eth.sendTransaction({
                        from: investor, to: this.ico.address,
                        value: AMOUNT,
                    });
                } catch (e) {
                    if (e.message.endsWith(': revert')) {
                        return;
                    }
                    console.log('*** ', e.message);
                }
                throw new Error();
            });
        });

        describe('investors on whitelist', () => {
            beforeEach(async () => {
                await this.ico.addAddressToWhitelist(investor, { from: owner });     
            });

            describe('send ether multiple times from the same address', () => {
                it('should reserve tokens', async () => {
                    await eth.sendTransaction({
                        from: investor, to: this.ico.address, value: AMOUNT,
                    }); 

                    await eth.sendTransaction({
                        from: investor, to: this.ico.address, value: AMOUNT,
                    }); 

                    const tokens = await this.ico.getBalance(investor);

                    assert.equal(300 * (10 ** 18), tokens.valueOf());
                });
            });

            describe('send different ether amounts', () => {
                describe('acceptable amount of ether', () => {
                    it('should reserve tokens', async () => {
                        await eth.sendTransaction({
                            from: investor, to: this.ico.address, value: AMOUNT,
                        });
    
                        const tokens = await this.ico.getBalance(investor);
    
                        assert.equal(300 * (10 ** 18), tokens.valueOf());
                    });
                });
    
                describe('lacking ether', () => {
                    it('should not reserve tokens', async () => {
                        try {
                            await eth.sendTransaction({
                                from: investor, to: this.ico.address,
                                value: AMOUNT * 0.1,
                            });
                        } catch (e) {
                            if (e.message.endsWith(': revert')) {
                                return;
                            }
                            console.log('*** ', e.message);
                        }
    
                        throw new Error();
                    });
                });
    
                describe('too much ether', () => {
                    it('should not reserve tokens', async () => {
                        try {
                            await eth.sendTransaction({
                                from: investor, to: this.ico.address,
                                value: AMOUNT * 100,
                            });
                        } catch (e) {
                            if (e.message.endsWith(': revert')) {
                                return;
                            }
                            console.log('*** ', e.message);
                        }
    
                        throw new Error();
                    });
                });
            });

            describe('under a hard cap', () => {
                describe('with investment that surpasses cap', () => {
                    it('should not accept transaction', async () => {
                        await eth.sendTransaction({
                            from: investor, to: this.ico.address,
                            value: AMOUNT * 99,
                        });
                        try {    
                            await eth.sendTransaction({
                                from: investor, to: this.ico.address,
                                value: AMOUNT * 99,
                            });
                        } catch (e) {
                            if (e.message.endsWith(': revert')) {
                                return;
                            }
                            console.log('*** ', e.message);
                        }
    
                        throw new Error();
                    });
                });
                
                describe('with investment below cap', () => {
                    it('should reserve tokens', async () => {
                        await eth.sendTransaction({
                            from: investor, to: this.ico.address,
                            value: AMOUNT * 99,
                        });
                    
                        await eth.sendTransaction({
                            from: investor, to: this.ico.address,
                            value: AMOUNT * 1,
                        });
                
                        const tokens = await this.ico.getBalance(investor);
    
                        assert.equal(300 * (10 ** 18), tokens.valueOf());
                    });
                });
            });
        });
    });

    describe('addAddressToWhitelist', () => {
        
        describe('permission', () => {
            describe('by owner', () => {
                it('should add address to whitelist', async () => {
                    await this.ico.addAddressToWhitelist(investor, { from: owner });
                });
            });
    
            describe('not by owner', () => {
                it('should not add address to whitelist', async () => {
                    try {
                        await this.ico.addAddressToWhitelist(investor, {
                            from: investor
                        });
                    } catch (e) {
                        if (e.message.endsWith(': revert')) {
                            return;
                        }
                        console.log('*** ', e.message);
                    }
    
                    throw new Error();
                });
            });
        })

        describe('functionality', () => {
            describe('whitelist', () => {
                it('should correctly report an address in the whitelist', async () => {
                    await this.ico.addAddressToWhitelist(investor, { from: owner });
                    
                    assert.equal(true, await this.ico.whitelist(investor));
                });
            });

            describe('addAddressesToWhitelist', () => {
                it('should add multiple investors to the whitelist', async () => {
                    const list = [investor, investor2];

                    await this.ico.addAddressesToWhitelist(list, { from: owner });

                    assert.equal(true, await this.ico.whitelist(investor));
                    assert.equal(true, await this.ico.whitelist(investor2));
                });
            });

            describe('removeAddressFromWhitelist', () => {
                it('should remove an investor from the whitelist', async () => {
                    await this.ico.addAddressToWhitelist(investor, { from: owner });
                    await this.ico.removeAddressFromWhitelist(investor, { from: owner });
                    
                    assert.equal(false, await this.ico.whitelist(investor));
                });
            });

            describe('removeAddressesFromWhitelist', () => {
                it('should remove multiple investors from the whitelist', async () => {
                    const list = [investor, investor2];
                    
                    await this.ico.addAddressesToWhitelist(list, { from: owner });
                    await this.ico.removeAddressesFromWhitelist(list, { from: owner });
                    
                    assert.equal(false, await this.ico.whitelist(investor));
                    assert.equal(false, await this.ico.whitelist(investor2));
                });
            });
        });
    });

    describe('pause and unpause', () => {
        beforeEach(async () => {
            await this.ico.addAddressToWhitelist(investor, { from: owner });     
        });
        describe('crowdsale paused', () => {
            it('should not accept any transactions', async () => {
                await this.ico.pause();
                try {    
                    await eth.sendTransaction({
                        from: investor, to: this.ico.address,
                        value: AMOUNT * 10,
                    });
                } catch (e) {
                    if (e.message.endsWith(': revert')) {
                        return;
                    }
                    console.log('*** ', e.message);
                }
                throw new Error();
            });
        });

        describe('crowdsale unpaused', () => {
            it('should accept transactions', async () => {
                await this.ico.pause();
                await this.ico.unpause();

                await eth.sendTransaction({
                    from: investor, to: this.ico.address, value: AMOUNT,
                });

                const tokens = await this.ico.getBalance(investor);

                assert.equal(300 * (10 ** 18), tokens.valueOf());
            });
        });
    });
});
