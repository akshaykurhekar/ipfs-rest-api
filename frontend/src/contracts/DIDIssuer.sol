// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract DIDIssuer is Ownable{

    mapping(address=> string) public record;
    
    string public issuerSymbol;
    
    event Mint(address _to);
    event Burn(address _to);
    event Update(address _to);

    constructor(address _issuerAddress, string memory _issuerSymbol) Ownable(_issuerAddress){
        issuerSymbol = _issuerSymbol;
    }
    
    
    function mint(address _to, string calldata URI)  external onlyOwner returns(string memory){
        require(bytes(record[_to]).length == 0, "Passport Already exists for the given address");
        string memory did = string(abi.encodePacked("did", ":", issuerSymbol, ":", URI));
        record[_to] = did;
        emit Mint(_to);
        return did;

    }

    function burn(address _to) external onlyOwner{
        delete record[_to];
        emit Burn(_to);
    }

    function update(address _to, string memory URI) external onlyOwner{
        require(bytes(record[_to]).length != 0, "Credential does not exist");
        string memory did = string(abi.encodePacked("did", ":", issuerSymbol, ":", URI));
        record[_to] = did;
        emit Update(_to);
    }
}