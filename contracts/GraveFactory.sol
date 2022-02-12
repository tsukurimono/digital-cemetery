// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";
import "./Grave.sol";

contract GraveFactory is Ownable {
    mapping(address => Grave[]) private _graves;
    uint256 constant maxLimit = 20;

    constructor() {
        transferOwnership(msg.sender);
    }

    function associatedGravesCount() public view returns(uint256) {
        return _graves[msg.sender].length;
    }

    function createGrave(string memory name, int256 birth, int256 death, string memory portraitURL) public {
        Grave grave = new Grave(name, birth, death, portraitURL, msg.sender);
        _graves[msg.sender].push(grave);
    }

    function associatedGraves(uint256 limit, uint256 offset) public view returns(Grave[] memory coll) {
        uint256 count = associatedGravesCount();
        uint256 start = count - offset < 0 ? count : offset;
        uint256 currentLimit = limit > maxLimit ? maxLimit : limit;
        uint256 end = offset + currentLimit < count ? offset + currentLimit : count;

        coll = new Grave[](end - start);

        for(uint256 i=0; i+start<end; i++) {
            coll[i] = _graves[msg.sender][i+start];
        }
        return coll;
    }
}