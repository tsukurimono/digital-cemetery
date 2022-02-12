// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Grave {
    string public name;
    int256 public birth;
    int256 public death;
    string public portraitURL;

    constructor(string memory _name, int256 _birth, int256 _death, string memory _portraitURL) {
        name = _name;
        birth = _birth;
        death = _death;
        portraitURL = _portraitURL;
    }
}