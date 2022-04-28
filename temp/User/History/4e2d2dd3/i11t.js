//atm this will only show the last bet
//..or the ongoing bet

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserHistory } from "../../../state/PredictionMarket/actions/fetchUserHistory";

export const UserHistory = (props) => {
  const userBets = useSelector((state) => state.predictionMarket.betsHistory);
  const dispatch = useDispatch();

  const contract = props.contract;
  const address = props.address;

  console.log(userBets[0].betResult);

  useEffect(() => {
    const payload = {
      contract,
      address,
    };

    dispatch(fetchUserHistory(payload));
  }, []);

  return (
    <div>
      <br />
      <br />
      <br />

      {userBets.map((item, index) => {
        return (
          <div>
            <div></div>
          </div>
        );
      })}
    </div>
  );
};
