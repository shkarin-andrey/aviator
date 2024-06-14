import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GlobalState {
  startRound: boolean;
}

const initialState: GlobalState = {
  startRound: false,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setToggleRound: (state: GlobalState, action: PayloadAction<GlobalState['startRound']>) => {
      state.startRound = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToggleRound } = globalSlice.actions;

export default globalSlice.reducer;
