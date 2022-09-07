// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./ERC20.sol";

contract ERC20Factory {
    event NewERC20(
        address indexed _address,
        string _name,
        string _symbol,
        address _owner
    );

    function createERC20(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 _totalSupply,
        address _owner
    ) public returns (address) {
        ERC20 newERC20 = new ERC20(
            _name,
            _symbol,
            _decimals,
            _totalSupply,
            _owner
        );
        emit NewERC20(address(newERC20), _name, _symbol, _owner);
        return address(newERC20);
    }
}
