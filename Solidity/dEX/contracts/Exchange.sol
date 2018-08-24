pragma solidity ^0.4.18;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract Exchange {
    address makerAccountAddress;
    address makerTokenAddress;
    uint256 makerTokenAmount;

    constructor() public {
        reset();
    }

    function participate(address tokenAddress, uint256 amount) public {
        require(tokenAddress != address(0));
        require(amount > 0);

        ERC20 token = ERC20(tokenAddress);
        require(token.transferFrom(msg.sender, address(this), amount));

        if (makerAccountAddress == address(0)) {
            makerAccountAddress = msg.sender;
            makerTokenAddress = tokenAddress;
            makerTokenAmount = amount;
        } else {
            exchange(msg.sender, tokenAddress, amount);
            reset();
        }
    }

    function exchange(
        address takerAccountAddress, address takerTokenAddress,
        uint256 takerTokenAmount
    ) internal {
        ERC20 makerToken = ERC20(makerTokenAddress);
        ERC20 takerToken = ERC20(takerTokenAddress);

        require(makerToken.transfer(takerAccountAddress, makerTokenAmount));
        require(takerToken.transfer(makerAccountAddress, takerTokenAmount));
    }

    function reset() internal {
        makerAccountAddress = address(0);
        makerTokenAddress = address(0);
        makerTokenAmount = 0;
    }
}
