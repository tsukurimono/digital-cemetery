// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Grave {
    event Created(address indexed inheritor);
    event PortraitUpdated(address indexed inheritor);
    event Inherited(address indexed inheritor);
    event Nominated(address indexed inheritor, address indexed successor);

    modifier onlyInheritor() {
        require(msg.sender == inheritor, "Grave: caller is not the inheritor");
        _;
    }

    modifier onlySuccessor() {
        require(msg.sender == successor, "Grave: caller is not the successor");
        _;
    }

    string public name;
    int256 public birth;
    int256 public death;
    string public portraitURL;
    address public inheritor;
    address public successor;

    constructor(string memory _name, int256 _birth, int256 _death, string memory _portraitURL, address _inheritor) {
        name = _name;
        birth = _birth;
        death = _death;
        portraitURL = _portraitURL;
        successor = _inheritor;
        inheritor = _inheritor;
        emit Created(_inheritor);
    }

    function setPortraitURL(string memory _portraitURL) public onlyInheritor {
        portraitURL = _portraitURL;
        emit PortraitUpdated(msg.sender);
    }

    function inherit() public onlySuccessor {
        inheritor = successor;
        emit Inherited(msg.sender);
    }

    function nominate(address _successor) public onlyInheritor {
        successor = _successor;
        emit Nominated(msg.sender, successor);
    }
}