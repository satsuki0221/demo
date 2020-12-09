import { combineReducers } from "redux";
import { useDispatch } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import gifReducer from "./gif";

const reducer = combineReducers({
  gif: gifReducer
});

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch

export default store;
