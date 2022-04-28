import { ethers } from "ethers";

export const makeABet = (payload) => {
  return (dispatch) => {
    const options = {
      value: ethers.utils.parseEther(payload.ethValue),
    };

    payload.contract
      .depositForBet(payload.chosenOption, options)
      .then((res) => {
        console.log(res);
        dispatch({
          type: "makeABet",
          payload: res,
        });
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
    // console.log(awa);
  };
};
