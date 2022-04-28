import { ethers } from "ethers";

export const makeABet = (payload) => {
  return (dispatch) => {
    const options = {
      value: ethers.utils.parseEther(payload.ethValue),
    };

    contract
      .depositForBet(0, options)
      .then((res) => {
        //add fetchUserHistory here
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
