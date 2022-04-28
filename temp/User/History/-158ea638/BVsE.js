import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { greetingReducer } from "./Greeter/reducers/index";
import { betReducer } from "./PredictionMarket/reducers";

//init state of the whole  app
const initState = {
  currentUser: "",
  greetingValue: "",
  isLoading: true,
  predictionMarket: {
    betsHistory: [],
  },
};

const allReducers = combineReducers(greetingReducer, betReducer);

export const store = createStore(
  allReducers,
  initState,
  applyMiddleware(thunk)
);
