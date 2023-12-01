// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract MassToken is ERC20Capped, ERC20Burnable {
    address payable public owner;
    constructor(uint256 cap) ERC20("MassToken", "MASS") ERC20Capped(cap * (10 ** decimals())){
        owner = payable(msg.sender);
        _mint(msg.sender, 70000000 * (10 ** decimals()));
    }

    // just obfuscated the problem, now all calls (who's methods the contract doesn't implement) go into fallback() where they're silently dropped and we don't figure out/ignore what is the real cause. Temp workaround
    fallback() external {
       
    }

    receive() external payable {}
    
    function _mint(address account, uint256 amount) internal virtual override(ERC20Capped, ERC20) {
        require(ERC20.totalSupply() + amount <= cap(), "ERC20Capped: cap exceeded");
        super._mint(account, amount);
    }


    modifier onlyOwner {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

}