export const betReducer = (state, action) => {
  switch (action.type) {
    case "fetchSingleBet":
      return (state = {
        ...state,
        predictionMarket: {
          ...state.predictionMarket,
          betsHistory: action.payload,
        },
      });
    case "fetchUserHistory":
      return (state = {
        ...state,
        predictionMarket: {
          ...state.predictionMarket,
          betsHistory: action.payload,
        },
      });
    case "placeBet":
      return (state = {
        ...state,
        predictionMarket: {
          ...state.predictionMarket,
          betsHistory: action.payload,
        },
      });
    default: {
      return { ...state, isLoading: true };
    }
  }
};
