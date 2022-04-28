export const fetchUserHistory = (payload) => {
  // console.log("fetch greeting, ", payload);

  return (dispatch) => {
    payload.contract
      .numberOfBets(payload.address)
      .then((num) => {
        console.log("numL ", num);

        //doing this for better error handling on the front end
        if (num != 0) {
          payload.contract
            .getUserTxHistory(payload.address)
            .then((res) => {
              //should have initialzed numberOfBets as -1, oops. Oh well.

              console.log("tx history: ", res[num]);

              dispatch({
                type: "fetchUserHistory",
                payload: res,
              });
            })
            .catch((err) => {
              console.log("Err fetching history: ", err);
            });
        }

        //dispatching an empty array
        //saves an API call too
        else {
          dispatch({
            type: "fetchUserHistory",
            payload: [],
          });
        }
      })
      .catch((err) => {
        console.log("err fetching number of bets: ", err);
      });
  };
};
