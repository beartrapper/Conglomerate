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

  useEffect(() => {
    contract
      .transactionHistory(address, 2)
      .then((res) => {
        console.log("adddress tx hostpr: ", res);
      })
      .catch((err) => {
        console.log("err fetching tx history: ", err);
      });

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
            {item.betResult} - {item.betType} - {parseInt(item.endingTime._hex)}{" "}
            -{parseInt(item.startingTime._hex)} -{" "}
            {parseInt(item.endingValue._hex)} -
            {parseInt(item.startingValue._hex)}
          </div>
        );
      })}
    </div>
  );
};
