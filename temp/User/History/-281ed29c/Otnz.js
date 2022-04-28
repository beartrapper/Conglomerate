export const fetchUserHistory = (payload) => {
  // console.log("fetch greeting, ", payload);

  return (dispatch) => {
    payload.contract
      .numberOfBets(payload.address)
      .then((num) => {
        console.log("numL ", num);
        payload.contract
          .getUserTxHistory(payload.address)
          .then((res) => {
            //should have initialzed numberOfBets as -1, oops. Oh well.
            console.log("tx history: ", res[num - 1]);
            dispatch({
              type: "fetchUserHistory",
              payload: res,
            });
          })
          .catch((err) => {
            console.log("Err fetching history: ", err);
          });
      })
      .catch((err) => {
        console.log("err fetching number of bets: ", err);
      });
    // payload.contract
    //   .getUserTxHistory(payload.address)
    //   .then((fetchedValue) => {
    //     console.log(fetchedValue, " fected value hostir");
    //     dispatch({
    //       type: "fetchUserHistory",
    //       payload: fetchedValue,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log("err has occured while fetching the first value", err);
    //   });
  };
};
