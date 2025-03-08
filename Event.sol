// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Event {
    error capacityFull();
    error eventCanceled();
    error notParticipant(); 
    error invalidTimeRange();
    error notOwner();
    error notAValidIndex();

    string s_name;
    uint32 s_capacity;
    uint256 s_startTime;
    uint256 s_endTime;
    bool s_isCanceled;

    address public s_owner;
    address[] public s_participants;
    mapping(address => uint256) public s_participantIndex; 
    mapping(address => bool) public s_hasTicket;

    constructor(string memory name, uint32 capacity, uint256 startTime, uint256 endTime) {
        if (startTime >= endTime) {
            revert invalidTimeRange();
        }
        s_name = name;
        s_capacity = capacity;
        s_startTime = startTime;
        s_endTime = endTime;
        s_isCanceled = false;
        s_owner = msg.sender;
    }

    modifier onlyOwner() {
        if (msg.sender != s_owner) {
            revert notOwner();
        }
        _;
    }

    function cancel() public onlyOwner{
        s_isCanceled = true;
    }

    function addParticipant(address) public {
        if (s_isCanceled) {
            revert eventCanceled();
        }
        if (s_participants.length >= s_capacity) {
            revert capacityFull();
        }
        if (s_hasTicket[msg.sender]) {
            revert("Already a participant");
        }

        s_participants.push(msg.sender);
        s_participantIndex[msg.sender] = s_participants.length - 1; 
        s_hasTicket[msg.sender] = true;
    }

    function removeParticipant() public {
        if (!s_hasTicket[msg.sender]) {
            revert notParticipant();
        }
        if (s_participants.length == 0){
            revert("Cannot remove participant from emtpy participant list");
        }

        uint256 participantIndex = s_participantIndex[msg.sender];

        // Move the last participant to the deleted participant's position
        address lastParticipant = s_participants[s_participants.length - 1];
        s_participants[participantIndex] = lastParticipant;
        s_participantIndex[lastParticipant] = participantIndex;

        // Remove the last element
        s_participants.pop();

        // Update mappings
        delete s_participantIndex[msg.sender];
        s_hasTicket[msg.sender] = false;
    }

    function getTicket() public view returns (bool){
        return s_hasTicket[msg.sender];
    }

    // function getParticipants() public view returns (address[] memory){
    //     return s_participants;
    // }
    function getParticipant(uint256 index) public view returns (address) {
        if(index >= s_participants.length || index < 0){
            revert notAValidIndex();
        }
        return s_participants[index];
    }

    function getParticipantsLength() public view returns (uint256) {
        return s_participants.length;
    }
}
