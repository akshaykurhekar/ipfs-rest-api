// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Issuer is Ownable {

    string public issuingCred;
    mapping (address => string ) public DID;
    
    bytes32 private zeroHash = bytes32(0);
    
    constructor(address issuerAddress, string memory _issuingCred) Ownable(issuerAddress) {
        issuingCred = _issuingCred;
    }

    event Issue(address _user, string _did);
    event Revoke(address _user, string _did);
    event Renew(address _user, string _did);

    function issue(address _user, string memory _cid ) external onlyOwner returns(string memory ){
        require(bytes(DID[_user]).length == 0, "Credential already exists");
          
        string memory did =string(abi.encodePacked("did", ":", issuingCred, ":", _cid));
        DID[_user] = did;
        emit Issue(_user, did);
        return did;
    }

    function renew(address _user, string memory did) external {
        require(bytes(DID[_user]).length != 0, "Credential does not exist");
        DID[_user] = did;
        emit Renew(_user,did);
    }

    function getCredential(address _user) external view returns (string memory) {
        return DID[_user];
    }
}