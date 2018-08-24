pragma solidity ^0.4.18;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";

contract MyTokenB is StandardToken {
    string public name = "MyTokenB";
    string public symbol = "MTKB";
    uint8 public decimals = 8;
    uint256 public INITIAL_SUPPLY = 10000 * 10000 * (10 ** uint256(decimals));

    constructor() public {
        totalSupply_ = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
        emit Transfer(address(0), msg.sender, INITIAL_SUPPLY);
    }
}
