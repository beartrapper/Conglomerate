import { useEffect, useState } from "react";
import { MakeABet } from "./MakeABet/MakeABet";
import { UserHistory } from "./UserHistory/UserHistory";

export const PredictionMarket = (props) => {
  const contract = props.contract;
  const address = props.address;
  
  //in an ideal application, the logic would be inside a function that
  //..would be called in useEffect thus making the code cleaner
  useEffect(() => {
    contract.numberOfBets(address)
    .then(num =>{
      console.log("numL ", num)
      contract.getUserTxHistory(address)
      .then(res => {
        //should have initialzed numberOfBets as -1, oops. Oh well. 
        console.log("tx history: ", res[num - 1])
      })
      .catch(err => {
        console.log("Err fetching history: ", err)
      })
    })
    .catch(err => {
      console.log("err fetching number of bets: ", err)
    })
   
  }, [props.address])

  return (
    <div>
      <MakeABet contract={contract} address={address}/>
      <UserHistory />
    </div>
  );
};
