import { createSlice } from '@reduxjs/toolkit';

export interface GlobalState {
  startGame: boolean;
  loseRound: boolean;
  startRound: boolean;
  winRound: boolean;
  endGame: boolean;
  endRound: boolean;
}

const initialState: GlobalState = {
  startGame: false,
  loseRound: false,
  startRound: false,
  winRound: false,
  endGame: false,
  endRound: false,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    dispatchClearGame: (state) => {
      state.startRound = false;
      state.loseRound = false;
      state.winRound = false;
      state.endGame = false;
    },
    dispatchStartGame: (state) => {
      state.startGame = true;
    },
    dispatchLoseRound: (state) => {
      state.loseRound = true;
    },
    dispatchStartRound: (state) => {
      state.startRound = true;
    },
    dispatchWinRound: (state) => {
      state.winRound = true;
    },
    dispatchEndGame: (state) => {
      state.endGame = true;
    },
    dispatchEndRound: (state) => {
      state.endRound = !state.endRound;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  dispatchEndGame,
  dispatchLoseRound,
  dispatchStartGame,
  dispatchStartRound,
  dispatchWinRound,
  dispatchClearGame,
  dispatchEndRound,
} = globalSlice.actions;

export default globalSlice.reducer;
