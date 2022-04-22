export const betReducer = (state, action) => {
  switch (action.type) {
    case "fetchSingleBet":
      return (state = {
        ...state,
        predictionMarket: {
          ...state.predictionMarket,
          latestBet: action.payload,
        },
      });
    case "placeBet":
      return (state = {
        ...state,
        predictionMarket: {
          ...state.predictionMarket,
          latestBet: action.payload,
        },
      });
    default: {
      return { ...state, isLoading: true };
    }
  }
};
