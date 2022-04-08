export const fetchGreetings = (payload) => {
  // console.log("fetch greeting, ", payload);

  return (dispatch) => {
    payload
      .greet()
      .then((fetchedValue) => {
        dispatch({
          type: "fetch",
          payload: fetchedValue,
        });
      })
      .catch((err) => {
        console.log("err has occured while fetching", err);
      });
  };
};
