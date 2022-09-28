// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Poll {
    struct Voter {
        address sender; // person delegated to
        uint vote;   // index of the voted proposal
        string name;
    }

    // This is a type for a single proposal.
    struct Proposal {
        string  name;   // short name (up to 32 bytes)
        uint voteCount; // number of accumulated votes
    }

    address public pollCreator;

    // This declares a state variable that
    // stores a `Voter` struct for each possible address.
    Voter[] public voters;

    // A dynamically-sized array of `Proposal` structs.
    Proposal[] public proposals;

    Proposal[] public proposalsWithoutVotes;

    /// Create a new ballot to choose one of `proposalNames`.
    function newPoll(string[] memory proposalNames) public {
        require(pollCreator == address(0), "Poll already running");
        pollCreator = msg.sender;

        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
            proposalsWithoutVotes.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }

    }

    /// Give your vote (including votes delegated to you)
    /// to proposal `proposals[proposal].name`.
    function vote(string memory name, uint proposal) public {
        for (uint i = 0; i < voters.length; i++) {
            if (voters[i].sender == msg.sender) {
                require(false, "Already voted.");
            }
        }
        voters.push(Voter({
            sender: msg.sender,
            vote: proposal,
            name: name
        }));

        // If `proposal` is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        proposals[proposal].voteCount += 1;
    }

    /// @dev Computes the winning proposal taking all
    /// previous votes into account.
    function getProposals() public view
            returns (Proposal[] memory proposals_)
    {
        require(msg.sender != pollCreator, "Voting not allowed for the poll creator");
        proposals_ = proposalsWithoutVotes;
    }

    function getProposalsWithVotes() public view
                returns (Proposal[] memory proposals_)
    {
        require(msg.sender == pollCreator, "Not the poll creator");
        proposals_ = proposals;
    }

    function closePoll() public {
        require(msg.sender == pollCreator,"Not the poll creator");
        delete proposalsWithoutVotes;
        delete proposals;
        delete pollCreator;
    }

    function pollIsActive() public view returns (bool active) {
        if (pollCreator != address(0)) {
            return true;
        } else {
            return false;
        }
    }

    function getVoters() public view returns (Voter[] memory voters_) {
        return voters;
    }
}