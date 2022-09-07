// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Test {
    uint public value;
    address public owner;

    constructor() {
        value = 1;
        owner = msg.sender;
    }

    function setValue(uint _value) public {
        value = _value;
    }

    function getValue() public view returns (uint) {
        return value;
    }
}
