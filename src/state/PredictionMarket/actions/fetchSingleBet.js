export const fetchSingleBet = (payload) => {
  // console.log("fetch greeting, ", payload);

  return (dispatch) => {
    payload.contract
      .numberOfBets(payload.address)
      .then((fetchedValue) => {
        payload.contract
          .transactionHistory(payload.address, fetchedValue)
          .then((_value) => {
            dispatch({
              type: "fetchSingleBet",
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
