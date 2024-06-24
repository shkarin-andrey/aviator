import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfoResponse } from '../../interfaces';
import { GameEvents } from '../../interfaces/GameEvents.enum';

export interface GlobalState {
  startRound: boolean;
  rate: number | null;
  multiplier: number | null;
  type: GameEvents;
  roundId: string | null;
  balance: number;
  betId: string | null;
  cash: number | undefined;
  rounds: number[];
  userInfo: Omit<UserInfoResponse, 'rounds' | 'balance'> | null;
  flewAway: boolean;
}

const initialState: GlobalState = {
  startRound: false,
  rate: null,
  multiplier: null,
  type: GameEvents.FINISH_ROUND,
  roundId: null,
  balance: 0,
  betId: null,
  cash: undefined,
  rounds: [],
  userInfo: null,
  flewAway: false,
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
    setMultiplier: (state: GlobalState, action: PayloadAction<GlobalState['multiplier']>) => {
      state.multiplier = action.payload;
    },
    setType: (state: GlobalState, action: PayloadAction<GlobalState['type']>) => {
      state.type = action.payload;
    },
    setRoundId: (state: GlobalState, action: PayloadAction<GlobalState['roundId']>) => {
      state.roundId = action.payload;
    },
    setBetId: (state: GlobalState, action: PayloadAction<GlobalState['betId']>) => {
      state.betId = action.payload;
    },
    setBalance: (state: GlobalState, action: PayloadAction<GlobalState['balance']>) => {
      state.balance = action.payload;
    },
    setCash: (state: GlobalState, action: PayloadAction<GlobalState['cash']>) => {
      state.cash = action.payload;
    },
    setRounds: (state: GlobalState, action: PayloadAction<GlobalState['rounds']>) => {
      state.rounds = action.payload;
    },
    setUserInfo: (state: GlobalState, action: PayloadAction<GlobalState['userInfo']>) => {
      state.userInfo = action.payload;
    },
    setFlewAway: (state: GlobalState, action: PayloadAction<GlobalState['flewAway']>) => {
      state.flewAway = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setToggleRound,
  setRate,
  setMultiplier,
  setType,
  setRoundId,
  setBetId,
  setBalance,
  setCash,
  setRounds,
  setUserInfo,
  setFlewAway,
} = globalSlice.actions;

export default globalSlice.reducer;
