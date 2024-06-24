import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { useAppDispatch } from './hooks/useAppDispatch';
import useInitDataApi from './hooks/useInitDataApi';
import { useSocketio } from './hooks/useSocketio';
import { GameEvents } from './interfaces/GameEvents.enum';
import { SocketEvents } from './interfaces/SocketEvent';
import { BetsPage } from './pages';
import { useGetUserInfoMutation } from './store/api/apiGameSlice';
import {
  setBalance,
  setCash,
  setFlewAway,
  setMultiplier,
  setRate,
  setRoundId,
  setRounds,
  setToggleRound,
  setType,
  setUserInfo,
} from './store/slices/globalSlice';

const wsUrl = process.env.REACT_APP_WS_URI;

export default function App() {
  const [getUserInfo] = useGetUserInfoMutation();

  const defaultApiBody = useInitDataApi();
  const dispatch = useAppDispatch();

  const refetchUserInfo = () => {
    getUserInfo(defaultApiBody)
      .unwrap()
      .then(({ balance, rounds, ...res }) => {
        dispatch(setBalance(balance));
        dispatch(setRounds(rounds));
        dispatch(setUserInfo(res));
      })
      .catch((error) => {
        alert(error.data.message);
        console.error(error);
      });
  };

  const socket = useSocketio(wsUrl || '', {
    autoConnect: true,
    transports: ['websocket', 'polling'],
    query: defaultApiBody,
  });

  useEffect(() => {
    refetchUserInfo();
  }, []);

  useEffect(() => {
    socket?.on('connect', () => {
      socket?.on('events', (events: SocketEvents) => {
        const { event, multiplier, roundId, amount } = events;

        dispatch(setType(event));
        dispatch(setRoundId(roundId));

        switch (event) {
          case GameEvents.START_ROUND:
            dispatch(setToggleRound(true));
            break;

          case GameEvents.FINISH_ROUND:
            refetchUserInfo();

            dispatch(setMultiplier(null));
            dispatch(setToggleRound(false));
            dispatch(setRate(null));
            dispatch(setFlewAway(true));

            break;

          case GameEvents.WIN:
            dispatch(setCash(amount));

            break;

          case GameEvents.LOSE:
            break;

          case GameEvents.TICK:
            dispatch(setMultiplier(multiplier));

            break;
        }
      });
    });
  }, [socket]);

  return (
    <div className="App relative">
      <Routes>
        <Route path="/" element={<BetsPage />} />
      </Routes>
    </div>
  );
}
