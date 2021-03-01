import reducer from "./reducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
  key: "primary",
  storage,
  whitelist: ["user"],
};

const pReducer = persistReducer(persistConfig, reducer);

export const configStore = () => {
  const store = createStore(
    pReducer,
    composeWithDevTools(applyMiddleware(thunk, logger))
  );

  return store;
};
