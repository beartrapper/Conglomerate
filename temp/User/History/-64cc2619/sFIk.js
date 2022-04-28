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
  console.log(address)

  const dispatch = useDispatch();

  useEffect(() => {
    contract.getUserTxHistory(address)
    .then(res => {
      console.log("tx history: ",res)
    })
    .catch(err => {
      console.log("Err fetching history: ", err)
    })
  }, [])

  const onChangeEthValue = (e) => {
    setEthValue(e.target.value);
  };

  const placeBet = async () => {
    const options = { 
      value: ethers.utils.parseEther("0.001"),
    };
    // const options = { value: 0.001 };
    // const ethValuee = ethers.utils.formatEther(10000);

    console.log(options.value.toString())

    contract.depositForBet(0, options)
    // contract.depositSomeEth(options)
    // contract.changeMinValueToBeDeposited(10000)
    .then(res => {
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
