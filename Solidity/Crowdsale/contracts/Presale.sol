pragma solidity ^0.4.24;

import "openzeppelin-solidity/contracts/access/Whitelist.sol";
import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";

contract Presale is Whitelist, Pausable {
    uint256 constant _rate = 300;
    uint256 constant _cap = 150 ether;

    mapping(address => uint256) public balances;

    constructor() public {
    }

    function () external payable onlyIfWhitelisted(msg.sender) whenNotPaused() {
        require(msg.value >= 1 ether);
        require(msg.value < 100 ether);
        require(this.balance < _cap);

        balances[msg.sender] = _rate * 10 ** 18 * msg.value / 1 ether;
    }

    function getBalance(address investor) public view
            returns (uint256) {
        return balances[investor];
    }
}
