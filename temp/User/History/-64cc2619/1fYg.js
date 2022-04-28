//always make the UI first
//then implement the logic
//makes you not lose your sanity

import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUserHistory } from "../../../state/PredictionMarket/actions/fetchUserHistory";
import { makeABet } from "../../../state/PredictionMarket/actions/makeABet";

export const MakeABet = (props) => {
  const contract = props.contract;
  const address = props.address;
  const [ethValue, setEthValue] = useState("");

  const dispatch = useDispatch();

  const onChangeEthValue = (e) => {
    let _val = e.target.value.toString();
    console.log(_val);
    setEthValue(_val);
  };

  const placeBet = (chosenOption) => {
    //makes it a bit more clean, no?
    const payload = {
      chosenOption,
      contract,
      ethValue,
      address,
    };

    dispatch(makeABet(payload))
      .then((res) => {
        //calling fetch to update state
        dispatch(fetchUserHistory(payload));
      })
      .catch((err) => {
        console.log("oh no, an error: ", err);
      });
  };

  return (
    <div>
      <button onClick={() => placeBet(0)}> Higher </button>
      <br />
      <button onClick={() => placeBet(1)}> Lower </button>
      <br />
      <input
        value={ethValue}
        type="number"
        placeholder="value in eth"
        onChange={onChangeEthValue}
      />
    </div>
  );
};
