//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


contract PredictionMarket {
    // DB

    // struct for txs
    struct Transaction {
        // bool higher;
        uint256 startingValue;
        uint256 endingValue;
        bool result;
        uint time;
    }

    // array of all players indicating balances
    // need this to indicate the balance while the bet is ongoing
    mapping(address => uint256) public playerBalances;

    // array of all players indicating history of players
    mapping(address => Transaction[]) public transactionHistory;

    // FUNCTIONS
    // deposit for bet
    function depositForBet() public payable{
        require(msg.value > 0, "is this a joke to you?");
        //update the player's balance
        playerBalances[msg.sender] += msg.value;

        //note the tx in db
        Transaction memory currentTx;
        uint256 startingTimeOfBet = block.timestamp; //using now instead of block.timestamp, the compiler just yelled at me :(
        uint256 endingtimeOfBet = startingTimeOfBet + 2 minutes;


        currentTx = Transaction(
            1,
            2,
            false,
            13
        );

        //wait a certain amount of time

        //check the price via chainlink

        //finalize(just a congrats for now. NFT in the future)
    }

    // get value for checking(chainlink)
    // determine
    // withdraw from contract(only owner)

    //get contract's balance back
    function getContractBalance() public view returns (uint256){
        return address(this).balance;
    }

        // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

}