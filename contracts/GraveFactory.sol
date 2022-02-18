// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Grave.sol";

contract GraveFactory {
    event GraveCreated(Grave indexed grave, address indexed inheritor);

    mapping(address => Grave[]) private _graves;
    uint256 constant maxLimit = 20;

    constructor() { }

    function associatedGravesCount() public view returns(uint256) {
        return _graves[msg.sender].length;
    }

    function createGrave(string memory name, int256 birth, int256 death, string memory portraitURL) public {
        Grave grave = new Grave(name, birth, death, portraitURL, msg.sender);
        _graves[msg.sender].push(grave);
        emit GraveCreated(grave, msg.sender);
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

    function associateGrave(address graveAddress) public {
        _graves[msg.sender].push(Grave(graveAddress));
    }

    function unassociateGrave(address graveAddress) public {
        Grave[] storage graves = _graves[msg.sender];
        bool contain = false;

        for(uint256 i=0; i<graves.length; i++) {
            if(address(graves[i]) == graveAddress) contain = true;
            if(contain && i+1<graves.length) graves[i] = graves[i+1];
        }
        if(contain) graves.pop();
    }
}