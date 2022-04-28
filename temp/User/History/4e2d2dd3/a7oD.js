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

  return (
    <div>
      <br />
      <br />
      <br />
      <table>
        <row>
          <column>1</column>
        </row>
        <column>2</column>
        <column>3</column>
        <column>4</column>
        <column>5</column>
        <column>6</column>
      </table>
      {userBets.map((item, index) => {
        console.log(item);
      })}
    </div>
  );
};
