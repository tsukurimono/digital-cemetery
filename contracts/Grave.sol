// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "../node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";

contract Grave is Ownable {
    event Created(address indexed inheritor);
    event PortraitUpdated(address indexed inheritor);
    event Inherited(address indexed inheritor);
    event Nominated(address indexed inheritor, address indexed successor);

    string public name;
    int256 public birth;
    int256 public death;
    string public portraitURL;
    address public successor;

    constructor(string memory _name, int256 _birth, int256 _death, string memory _portraitURL, address _inheritor) {
        name = _name;
        birth = _birth;
        death = _death;
        portraitURL = _portraitURL;
        successor = _inheritor;
        transferOwnership(_inheritor);
        emit Created(_inheritor);
    }

    function setPortraitURL(string memory _portraitURL) public onlyOwner {
        portraitURL = _portraitURL;
        emit PortraitUpdated(msg.sender);
    }

    modifier onlySuccessor() {
        require(msg.sender == successor, "Grave: Caller is not successor");
        _;
    }

    function inherit() public onlySuccessor {
        transferOwnership(successor);
        emit Inherited(msg.sender);
    }

    function nominate(address _successor) public onlyOwner {
        successor = _successor;
        emit Nominated(msg.sender, successor);
    }
}