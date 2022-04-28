import { MakeABet } from "./MakeABet/MakeABet";
import { UserHistory } from "./UserHistory/UserHistory";

export const PredictionMarket = (props) => {
  const contract = props.contract;
  const address = props.address;

  return (
    <div>
      <MakeABet contract={contract} address={address}/>
      <UserHistory contract={contract} address={address}/>
    </div>
  );
};
