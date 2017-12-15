pragma solidity 0.4.18;

import "zeppelin-solidity/contracts/token/MintableToken.sol";


contract NitrousToken is MintableToken {
    string public constant name = "NitrousToken";
    string public constant symbol = "NOS";
    uint8 public constant decimals = 18;
}