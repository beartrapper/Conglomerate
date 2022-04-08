export const greetingReducer = (state, action) => {
  switch (action.type) {
    case "fetch":
      return (state = {
        greetingValue: action.payload,
        isLoading: false,
      });
    case "set":
      console.log("reducer: ", action);
      return (state = {
        greetingValue: action.payload,
        isLoading: false,
      });
    default: {
      return { ...state, isLoading: true };
    }
  }
};
