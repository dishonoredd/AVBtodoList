import { configureStore, createSlice } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type ModeState = {
  mode: boolean;
};

const initialState: ModeState = {
  mode: false,
};

export const modeSlice = createSlice({
  name: "mode",
  initialState: initialState,
  reducers: {
    changeMode: (state) => {
      state.mode = !state.mode;
    },
  },
});

export const store = configureStore({
  reducer: {
    modeSlice: modeSlice.reducer,
  },
});
