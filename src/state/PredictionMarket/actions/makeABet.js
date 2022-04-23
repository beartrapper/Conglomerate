import { ethers } from "ethers";

export const makeABet = (payload) => {
  console.log(payload);

  return (dispatch) => {
    return new Promise((resolve, reject) => {
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
          resolve();
        })
        .catch((err) => {
          console.log("Err: ", err);
        });
      // console.log(awa);
    });
  };
};
