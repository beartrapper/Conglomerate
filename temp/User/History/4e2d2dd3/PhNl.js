//atm this will only show the last bet
//..or the ongoing bet

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserHistory } from "../../../state/PredictionMarket/actions/fetchUserHistory";

export const UserHistory = (props) => {
  const userBets = useSelector((state) => state.predictionMarket);
  const dispatch = useDispatch();

  const contract = props.contract;
  const address = props.address;

  useEffect(() => {
    const payload = {
      contract,
      address,
    };

    dispatch(fetchUserHistory(payload));
  });

  return (
    <div>
      <br />
      <br />
      <br />
      {"the fetched value will go here"}
    </div>
  );
};
