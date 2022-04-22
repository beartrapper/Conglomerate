export const fetchUserHistory = (payload) => {
  // console.log("fetch greeting, ", payload);

  return (dispatch) => {
    payload.contract
      .getUserTxHistory(payload.address)
      .then((fetchedValue) => {
        console.log(fetchedValue, " fected value hostir");
        dispatch({
          type: "fetchUserHistory",
          payload: fetchedValue,
        });
      })
      .catch((err) => {
        console.log("err has occured while fetching the first value", err);
      });
  };
};
