import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import useInitDataApi from './hooks/useInitDataApi';
import { useSocketio } from './hooks/useSocketio';
import { Events } from './interfaces/Events.enum';
import { SocketEvents } from './interfaces/SocketEvent';
import { BetsPage } from './pages';

const wsUrl = process.env.REACT_APP_WS_URI;

export default function App() {
  const defaultApiBody = useInitDataApi();

  const socket = useSocketio(wsUrl || '', {
    autoConnect: true,
    // path: '/socket.io/',
    transports: ['websocket', 'polling'],
    query: defaultApiBody,
  });

  useEffect(() => {
    socket?.on('connect', () => {
      socket?.on('events', (events: SocketEvents) => {
        const { event, multiplier, roundId, amount } = events;

        console.log(events);

        switch (event) {
          case Events.START_ROUND:
            console.log('start');
            break;

          case Events.FINISH_ROUND:
            console.log('finish');

            break;

          case Events.WIN:
            console.log('win');

            break;

          case Events.LOSE:
            console.log('lose');

            break;

          case Events.TICK:
            console.log('tick');

            break;

          default:
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
