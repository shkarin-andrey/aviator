import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GlobalState {
  startRound: boolean;
  rate: number | null;
}

const initialState: GlobalState = {
  startRound: true,
  rate: null,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setToggleRound: (state: GlobalState, action: PayloadAction<GlobalState['startRound']>) => {
      state.startRound = action.payload;
    },
    setRate: (state: GlobalState, action: PayloadAction<GlobalState['rate']>) => {
      state.rate = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToggleRound, setRate } = globalSlice.actions;

export default globalSlice.reducer;
