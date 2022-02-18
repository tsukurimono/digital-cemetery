// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Grave {
    event Created(Grave indexed grave, address indexed inheritor);
    event Prayed(address indexed prayer);
    event PortraitUpdated(address indexed inheritor);
    event EpigraphUpdated(address indexed inheritor);
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
    string public epigraph;
    uint256 public prayed;
    address public inheritor;
    address public successor;

    constructor(string memory _name, int256 _birth, int256 _death, string memory _portraitURL, string memory _epigraph, address _inheritor) {
        name = _name;
        birth = _birth;
        death = _death;
        portraitURL = _portraitURL;
        epigraph = _epigraph;
        successor = _inheritor;
        inheritor = _inheritor;
        prayed = 0;
        emit Created(this, _inheritor);
    }

    function setPortraitURL(string memory _portraitURL) public onlyInheritor {
        portraitURL = _portraitURL;
        emit PortraitUpdated(msg.sender);
    }

    function setEpigraph(string memory _epigraph) public onlyInheritor {
        epigraph = _epigraph;
        emit EpigraphUpdated(msg.sender);
    }

    function inherit() public onlySuccessor {
        inheritor = successor;
        emit Inherited(msg.sender);
    }

    function nominate(address _successor) public onlyInheritor {
        successor = _successor;
        emit Nominated(msg.sender, successor);
    }

    function pray() public {
        prayed++;
        emit Prayed(msg.sender);
    }
}