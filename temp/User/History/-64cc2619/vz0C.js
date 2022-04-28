//always make the UI first
//then implement the logic
//makes you not lose your sanity

import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const MakeABet = (props) => {
  const contract = props.contract;
  const address = props.address;
  const [ethValue, setEthValue] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
  console.log(address) 

    contract.getUserTxHistory(address)
    .then(res => {
      console.log("tx history: ",res[0])
    })
    .catch(err => {
      console.log("Err fetching history: ", err)
    })
  }, [])

  const onChangeEthValue = (e) => {
    let _val = (e.target.value).toString();
    console.log(_val)
    setEthValue(_val);
  };

  const placeBet = async () => {
    const options = { 
      value: ethers.utils.parseEther(_val),
    };

    contract.depositForBet(0, options)
    .then(res => {
      //add fetchUserHistory here
      console.log(res)
    })
    .catch(err => {
      console.log("Err: ", err)
    });
    // console.log(awa);

    contract.getLatestPrice()
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log("help! :", err)
    })

  };

  return (
    <div>
      <button onClick={() => placeBet()}> Higher </button>
      <br />
      <button onClick={() => placeBet()}> Lower </button>
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
