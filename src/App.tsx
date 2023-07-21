import React, { useEffect, useState } from 'react';
import { useTelegramWebApp, withTelegramWebApp } from 'react-telegram-webapp';
import { io } from 'socket.io-client';
import './App.css';

// import ProgressBar from './components/ProgressBar';
// import OneRowComponent from './components/OneRowComponent';
// import Button from './components/Button/Button';
// import Chart from './components/Chart/Chart';

/*
const initDataUnsafe = {
  'query_id': 'AAEVg2JJAgAAABWDYknk6ye8',
  'user': {
    'id': 5526160149,
    'first_name': 'P000-🎞Владимир',
    'last_name': '',
    'username': 'P000Vladimir',
    'language_code': 'ru',
  },
  'auth_date': '1664978388',
  'hash': 'c5a7bdea40cd74dd56facebe893b703cd0d0d245ee35fc18c897f296ef1ed6e1',
};
 */

const wsUri: string = process.env.REACT_APP_WS_URI || '';
const socket = io(wsUri, {
  autoConnect: true,
  path: '/socket.io/',
  transports: ['websocket'],
  extraHeaders: {
    'ngrok-skip-browser-warning': 'true',
    'User-Agent': 'socket-io',
  },
});

// const getProgressSeconds = (ioSocketTime: number) => {
//   const date = new Date(ioSocketTime).getSeconds();
//   const time = 60 - date;
//   return time;
// };

function App() {
  const tg = useTelegramWebApp();
  // const [currentBalance, setCurrentBalance] = useState(0);
  // const [bonusBalance, setBonusBalance] = useState(0);
  // const [bid, setBid] = useState(0);
  // const [ioSocket, setIoSocket] = useState({ price: 0, time: 0 });
  // const [values, setValues] = useState(null);
  // const [isBetMade, setIsBetMade] = useState(false);
  // const [isEndTime, setIsEndTime] = useState(false);
  // const [time, setTime] = useState(0);
  // const [roundPrice, setRoundPrice] = useState(0);
  // const [previousRoundPrice, setPreviousRoundPrice] = useState(0);
  const [isWork, setIsWork] = useState<any>('disconnected');

  // const addDollar = async () => {
  //   setBid(+10);
  //   setIsEndTime(true);
  //   setIsBetMade(true);
  //   // const { bonusBalance: bonusStart, currentBalance: currentStart } = CurrentBalance();
  //   // setIsWork(currentStart);
  //   const { data: dataStart } = await axios.post('/api/wallet', {
  //     telegramId: tg.initDataUnsafe?.user?.id,
  //   });
  //
  //   if (dataStart.balance >= 10 || dataStart.bonusBalance >= 10) {
  //     socket.emit('bid', {
  //       telegramId: tg.initDataUnsafe?.user?.id,
  //       amount: bid + 10,
  //     });
  //   }
  //   const { data } = await axios.post('/api/wallet', {
  //     telegramId: tg.initDataUnsafe?.user?.id,
  //   });
  //   setBonusBalance(data.bonusBalance);
  //   setCurrentBalance(data.balance);
  // };

  // const deniedDollar = async () => {
  //   setBid(-10);
  //   setIsEndTime(true);
  //   setIsBetMade(true);
  //   const { data: dataStart } = await axios.post('/api/wallet', {
  //     telegramId: tg.initDataUnsafe?.user?.id,
  //   });
  //
  //   if (dataStart.balance >= 10 || dataStart.bonusBalance >= 10) {
  //     socket.emit('bid', {
  //       telegramId: tg.initDataUnsafe?.user?.id,
  //       amount: bid - 10,
  //     });
  //   }
  //   const { data } = await axios.post('/api/wallet', {
  //     telegramId: tg.initDataUnsafe?.user?.id,
  //   });
  //   setBonusBalance(data.bonusBalance);
  //   setCurrentBalance(data.balance);
  // };

  useEffect(() => {
    tg.ready();

    // axios
    //   .post('/api/wallet', {
    //     telegramId: tg.initDataUnsafe?.user?.id,
    //   })
    //   .then((res) => {
    //     setCurrentBalance(res.data.balance);
    //     setBonusBalance(res.data.bonusBalance);
    //     setValues(res.data);
    //   });

    socket.on('connect', () => {
      setIsWork('connected');
      // socket.on('ticker', (arg) => {
      //   setIoSocket(arg);
      // });
    });
  }, []);

  // const onClick = () => {
  //   tg.close();
  // };

  // setTimeout(() => {
  //   tg.MainButton.setParams({
  //     text: 'Хочу забрать деньги у дилера!!!!',
  //     is_visible: true,
  //   });
  //
  //   tg.MainButton.onClick(onClick);
  // }, 1000);
  // const date = new Date(ioSocket.time).getSeconds();

  // useEffect(() => {
  //   const newTime = getProgressSeconds(ioSocket.time);
  //   if (newTime > 59) {
  //     axios
  //       .post('/api/wallet', {
  //         telegramId: tg.initDataUnsafe?.user?.id,
  //       })
  //       .then((res) => {
  //         setCurrentBalance(res.data.balance);
  //         setBonusBalance(res.data.bonusBalance);
  //         setValues(res.data);
  //       });
  //     const newPrice = roundPrice;
  //     let priceNow = 0;
  //     axios.get('/api/game/round-info').then((res) => {
  //       setRoundPrice(res.data.roundPrice);
  //       priceNow = res.data.roundPrice;
  //       setPreviousRoundPrice(priceNow - newPrice);
  //     });
  //     setIsEndTime(false);
  //     setIsBetMade(false);
  //     setBid(0);
  //   }
  //   if (newTime <= 10) {
  //     setIsBetMade(true);
  //   }
  //   socket.on('new-round', (arg) => {
  //     setIsWork(arg);
  //   });
  //   setTime(newTime);
  // }, [ioSocket.time]);

  // const getProgressWidth = () => {
  //   const width = Math.floor((date * 100) / 60);
  //   return width;
  // };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Coming soon...</h1>

        {/*<p>Hello {tg.initDataUnsafe?.user?.first_name}</p>*/}
        {/*<p>*/}
        {/*  <button onClick={onClick}>Круто!</button>*/}
        {/*</p>*/}
        <span>Tech data:</span>
        <span>WS = {JSON.stringify(isWork)}</span>
        <span>{JSON.stringify(tg.initDataUnsafe)}</span>
        {/*<OneRowComponent text="Ваш баланс: " value={currentBalance} />*/}
        {/*<OneRowComponent text="Ваш бонусный баланс: " value={bonusBalance} />*/}
        {/*<OneRowComponent text="Цена биткоина в прошлом раунде: " value={roundPrice} />*/}
        {/*<OneRowComponent text="Разница: " value={previousRoundPrice} />*/}
        {/*<OneRowComponent text="Цена биткоина сейчас:" value={ioSocket?.price || 0} />*/}

        {/* <Chart /> */}
        {/*<ProgressBar width={getProgressWidth()} seconds={time} />*/}
        {/* <div className="btn__wrapper">
          <Button
            onClick={() => {
              console.log('work');
            }}
            value="Поставить 20$"
          />
          <Button
            onClick={() => {
              console.log('work');
            }}
            value="Поставить 1100$"
          />
        </div> */}
      </div>
    </div>
  );
}

const validateHash = async (hash: string) => {
  // TODO: remove later
  return true;

  if (process.env.NODE_ENV !== 'production') {
    return true;
  }

  const raw = await fetch('/api/hash', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ hash }),
  });
  const { status } = await raw.json();

  return status;
};

export default withTelegramWebApp(App, { validateHash });
