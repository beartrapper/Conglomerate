import { useEffect, useState } from "react";
import { MakeABet } from "./MakeABet/MakeABet";
import { UserHistory } from "./UserHistory/UserHistory";

export const PredictionMarket = (props) => {
  const contract = props.contract;
  const address = props.address;

  //in an ideal application, the logic would be inside a function that
  //..would be called in useEffect thus making the code cleaner
  useEffect(() => {}, [props.address]);

  return (
    <div>
      <MakeABet contract={contract} address={address} />
      <UserHistory contract={contract} address={address} />
    </div>
  );
};
