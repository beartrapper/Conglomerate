//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Shitcoin is ERC20 {

    //init 
    //no need to pass args dynamically
    constructor() ERC20("Shitcoin", "SHIT"){
        _mint(msg.sender, 1000000000);
    }
}