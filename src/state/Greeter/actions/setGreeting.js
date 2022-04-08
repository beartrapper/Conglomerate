export const setGreetings = (payload, value) => {
  console.log(payload, value);
  return (dispatch) => {
    payload
      .setGreeting(value)
      .then((setValue) => {
        dispatch({
          type: "set",
          payload: value,
        });
      })
      .catch((err) => {
        console.log("err has occured while fetching", err);
      });
  };
};
