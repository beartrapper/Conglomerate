import { MakeABet } from "./MakeABet/MakeABet";
import { UserHistory } from "./UserHistory/UserHistory";

export const PredictionMarket = (props) => {
  const contract = props.contract;

  return (
    <div>
      <MakeABet contract={contract} />
      <UserHistory contract={contract} />
    </div>
  );
};
