//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "../contracts/WinnerNFT.sol";

contract PredictionMarket {

    constructor (WinnerNFT _winnerNFT){
        owner = msg.sender;

        //assigning address to the instance
        winnerNFT = _winnerNFT;

        //bnb testet addy
        priceFeed = AggregatorV3Interface(0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526);

    }

    // DB
    //NFT contract instance
    WinnerNFT public winnerNFT;

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
    mapping(address => mapping(uint32 => Transaction)) public transactionHistory;

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
        require(msg.value > minValueToBeDeposited, "is this a joke to you?");
        
        //update the player's balance
        playerBalances[msg.sender] += msg.value;

        //note the tx in db
        Transaction memory currentTx;
        uint256 startingTimeOfBet = block.timestamp; //using block.timestamp instead of now, the compiler just yelled at me :(
        uint256 endingtimeOfBet = startingTimeOfBet + 16 minutes;

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

        //updating the db
        transactionHistory[msg.sender][numberOfBets[msg.sender]] = currentTx;

        //add to the total number of bets
        //dunno why but this might be useful in the future
        //why not code it then, you ask?
        //idk, shataap.
        ++numberOfBets[msg.sender]; // smol gas saver, weeeee
    }

        // get value for checking(chainlink)
    function getLatestPrice() public view returns (int){
        
        //latest round data returns a tuple with with multiple values
(
            /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = priceFeed.latestRoundData();
        return price;
    }

    // withdraw from contract(only owner)
    function withdraw() public _onlyOwner {
        payable(owner).transfer(getContractBalance());
    }

    //get contract's balance back
    function getContractBalance() public view returns (uint256){
        return address(this).balance;
    }

    //change min value to be deposited
    function changeMinValueToBeDeposited(uint256 _value) public _onlyOwner {
        minValueToBeDeposited = _value;
    }


    //use reentrancy gauard with this function
      function finalizeBet(uint32 betNumber) public{
        //get the latest/current tx
        Transaction memory txHolder = transactionHistory[msg.sender][betNumber];

        //check if someone's being naughty
        require(block.timestamp >= txHolder.endingTime, "naughty naughty, you.");

        //check for trying twice
        require(txHolder.betResult == BetResult.PENDING, "can't finalize an already finalized tx");

        //get the price from chainlink
        uint256 endingPriceForBet = uint256(getLatestPrice());
        
        //assign ending value to the tx
        txHolder.endingValue = endingPriceForBet;

        //determine with if
        //BULL CASE
        if(txHolder.betType == BetType.BULL){
            if(txHolder.startingValue <= txHolder.endingValue){
                //update the db
                txHolder.betResult = BetResult.WON;

                //give NFT
                transferNFT();

                //transfer the funds back
                payable(msg.sender).transfer(playerBalances[msg.sender]);
                
            } else {
                //update the db
                txHolder.betResult = BetResult.LOST;
            }
        }

        //BEAR CASE
        if(txHolder.betType == BetType.BEAR){
            if(txHolder.startingValue >= txHolder.endingValue){
                //update the db
                txHolder.betResult = BetResult.WON;

                //give NFT
                transferNFT();

                //transfer the funds back
                payable(msg.sender).transfer(playerBalances[msg.sender]);
            } else {
                //update the db
                txHolder.betResult = BetResult.LOST;
            }
        }

        //either way, the balance of the player will be reset
        playerBalances[msg.sender] = 0;

        //update the tx values
        transactionHistory[msg.sender][betNumber] = txHolder;

    }

    function transferNFT() internal {

        //if i send this wihtout an address arg, msg.sender in the NFT contract will be this contract
        //..because of call being for this.
        winnerNFT.createNFT(msg.sender);
    }




}