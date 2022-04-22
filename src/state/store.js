import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { greetingReducer } from "./Greeter/reducers/index";

//init state of the whole  app
const initState = {
  currentUser: "",
  greetingValue: "",
  isLoading: true,
  predictionMarket: {
    latestBet: {},
  },
};

export const store = createStore(
  greetingReducer,
  initState,
  applyMiddleware(thunk)
);
