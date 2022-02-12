// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";

contract GraveFactory is Ownable {
    constructor() {
        transferOwnership(msg.sender);
    }
}