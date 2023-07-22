import React, { useEffect, useState } from 'react';
import './App.css';
import { io, Socket } from 'socket.io-client';
import { useTelegramGameProxy } from './hooks/use-telegram-game-proxy';
import { Logo } from './components/Logo';

const wsUri: string = process.env.REACT_APP_WS_URI || '';

export default function App() {
  const tg = useTelegramGameProxy();
  const [isWork, setIsWork] = useState<string>('disconnected');
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socket = io(wsUri, {
      autoConnect: true,
      path: '/socket.io/',
      transports: ['websocket'],
      query: tg.initParams,
    });

    socket.on('connect', () => {
      setIsWork('connected');

      socket.on('start_round', (arg: any) => {
        console.log(arg);
      });

      socket.on('end_round', (arg: any) => {
        console.log(arg);
      });

      socket.on('result', (arg: any) => {
        console.log(arg);
      });
    });

    setSocket(socket);
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        <h1>Coming soon...</h1>
        <Logo></Logo>
        <div>
          <h4>Tech data:</h4>
        </div>
        <div>
          <strong>WS: </strong>
          <span>{isWork}</span>
        </div>
        {Object.entries(tg.initParams).map(([key, val]) => (
          <div>
            <strong>{key}: </strong>
            <span>{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
