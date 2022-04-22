export const makeABet = (payload) => {
  // console.log("fetch greeting, ", payload);
  const options = { value: ethers.utils.parseEther(payload.value) };

  return (dispatch) => {
    payload.contract
      .depositForBet(payload.address)
      .then((fetchedValue) => {
        payload.contract
          .transactionHistory(payload.address, fetchedValue)
          .then((_value) => {
            dispatch({
              type: "makeABet",
              payload: _value,
            });
          })
          .catch((err) => {
            console.log("err fetching the second value");
          });
      })
      .catch((err) => {
        console.log("err has occured while fetching the first value", err);
      });
  };
};
