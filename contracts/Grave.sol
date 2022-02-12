// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";

contract Grave is Ownable {
    event Created(address indexed inheritor);

    string public name;
    int256 public birth;
    int256 public death;
    string public portraitURL;

    constructor(string memory _name, int256 _birth, int256 _death, string memory _portraitURL, address _inheritor) {
        name = _name;
        birth = _birth;
        death = _death;
        portraitURL = _portraitURL;
        transferOwnership(_inheritor);

        emit Created(_inheritor);
    }

    function setPortraitURL(string memory _portraitURL) public onlyOwner {
        portraitURL = _portraitURL;
    }

    function inherit(address _inheritor) public onlyOwner {
        transferOwnership(_inheritor);
    }
}