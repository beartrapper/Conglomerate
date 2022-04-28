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
    const payload = {
      contract,
      address,
    };

    dispatch(fetchUserHistory(payload));
  }, []);

  //this should be inside a helper functions directory
  function hex_to_ascii(str1) {
    var hex = str1.toString();
    var str = "";
    for (var n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  }

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
