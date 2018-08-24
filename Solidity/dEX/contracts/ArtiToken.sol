pragma solidity ^0.4.4;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract ArtiToken is StandardToken {
    string public name = "ArtiToken";
    string public symbol = "ART";
    uint8 public decimals = 8;
    uint256 public INITIAL_SUPPLY = 10000 * 10000 * (10 ** uint256(decimals));

    constructor() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
        emit Transfer(address(0), msg.sender, INITIAL_SUPPLY);
    }
}
