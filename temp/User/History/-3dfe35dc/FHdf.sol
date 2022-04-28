//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PredictionMarket {

    constructor (){
        owner = msg.sender;

        //kovan network address addded
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);

    }
    
    // DB
    // minimumValue to be deposited
    uint256 public minValueToBeDeposited;

    // owner of the contract
    address public owner;

    //state for bets
    //error handling becomes easier with this
    enum BetType {
        BULL,
        BEAR
    }

    //this makes it easier to reference bets
    enum BetResult {
        WON,
        LOST,
        PENDING
    }

    // struct for txs
    struct Transaction {
        BetType betType;
        uint256 startingValue;
        uint256 endingValue;
        uint256 startingTime;
        uint256 endingTime;
        BetResult betResult;
    }

    // array of all players indicating balances
    // need this to indicate the balance while the bet is ongoing
    mapping(address => uint256) public playerBalances;

    // array of all players indicating history of players
    mapping(address => Transaction[]) public transactionHistory;

    //reference number for bets
    mapping (address => uint32) public numberOfBets;

    AggregatorV3Interface internal priceFeed;

    //MODIFIERS
    //only owner can call a certain function
    modifier _onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    // FUNCTIONS
    // deposit for bet
    function depositForBet(BetType _betType) public payable{

        //checking if the money sent is enough
        // require(msg.value > minValueToBeDeposited, "is this a joke to you?");
        
        //update the player's balance
        playerBalances[msg.sender] += msg.value;

        //note the tx in db
        Transaction memory currentTx;
        uint256 startingTimeOfBet = block.timestamp; //using now instead of block.timestamp, the compiler just yelled at me :(
        uint256 endingtimeOfBet = startingTimeOfBet + 2 minutes;

        //getting the starting price of the contract
        uint256 startingPriceForBet = uint256(getLatestPrice());

        //tx object
        currentTx = Transaction(
            _betType,
            startingPriceForBet,
            0,
            startingTimeOfBet,
            endingtimeOfBet,
            BetResult.PENDING
        );

        //pushing in the object in array
        transactionHistory[msg.sender].push(currentTx);

        //can use array.length too
        numberOfBets[msg.sender]++;
    }

    // function finalizeBet() public{
    //     //get the latest/current tx
    //     Transaction memory txHolder = transactionHistory[msg.sender][numberOfBets[msg.sender]];

    //     //get the price from chainlink
    //     uint256 endingPriceForBet = uint256(getLatestPrice());
        
    //     //assign ending value to the tx
    //     txHolder.endingValue = endingPriceForBet;

    //     //check if someone's being naughty
    //     require(block.timestamp >= txHolder.endingTime, "naughty naughty, you.");

    //     //determine with if

    //     //BULL CASE
    //     if(txHolder.betType == BetType.BULL){
    //         if(txHolder.startingValue <= txHolder.endingValue){
    //             //update the db
    //             txHolder.betResult = BetResult.WON;
    //         } else {
    //             //update the db
    //             txHolder.betResult = BetResult.LOST;
    //             playerBalances[msg.sender] = 0;
    //         }
    //     }

    //     //BEAR CASE
    //     if(txHolder.betType == BetType.BEAR){
    //         if(txHolder.startingValue >= txHolder.endingValue){
    //             //update the db
    //             txHolder.betResult = BetResult.WON;
    //         } else {
    //             //update the db
    //             txHolder.betResult = BetResult.LOST;
    //             playerBalances[msg.sender] = 0;
    //         }
    //     }
        
        
    //     //return a message of some sort

    // }

    // get value for checking(chainlink)
    function getLatestPrice() public view returns (int){
        
        //latest round data returns a tuple with with multiple values
        (,int price, , ,) = priceFeed.latestRoundData();
        return price;
    }


    // withdraw from contract(only owner)

    //get contract's balance back
    function getContractBalance() public view returns (uint256){
        return address(this).balance;
    }

    //change min value to be deposited
    function changeMinValueToBeDeposited(uint256 _value) public _onlyOwner {
        minValueToBeDeposited = _value;
    }

    //will have to do multiple calls to get all tx data instead choosing a function to do it 
    function getUserTxHistory(address _user) public view returns (Transaction[] memory){

        // declaring a holder array
        Transaction[] memory holderArray = new Transaction[](numberOfBets[_user]);
        // Transaction memory txHolder; 
        holderArray = transactionHistory[_user];
        // txHolder = holderArray[numberOfBets[_user]];

        // // looping over the original and getting all the values out into the holder array
        // for(uint32 counter = 0; counter < numberOfBets[_user]; counter++){

        //     //convert to storage for some reason
        //     //idk why, ask stackoverflow guys
        //     Transaction storage holderElement = transactionHistory[_user][counter];

        //     //getting the value from the original aarray
        //     //push it into the holder array
        //     holderArray[counter] = holderElement;
        // }

        // // return holder array
        return holderArray;
        // return txHolder;
        
    }


    function depositSomeEth() public payable returns (bool){
        return true;
    }

}