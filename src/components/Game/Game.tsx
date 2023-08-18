import axios from 'axios';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useTelegramGameProxy } from '../../hooks/use-telegram-game-proxy';
import { Events } from '../../interfaces/events.enum';
import { SocketEvents } from '../../interfaces/SocketEvent';
import Bets from '../Bets';
import BgButtons from '../BgButtons';
import BasicLayouts from '../Layouts/BasicLayout';
import Money from '../Money';
import OnGameReward from '../OnGameReward';
import PlayButton from '../PlayButton';

const wsUri: string = process.env.REACT_APP_WS_URI || '';

const BetsPage = () => {
  const tg = useTelegramGameProxy();
  const [socket, setSocket] = useState<Socket>();
  const [multiply, setMultiply] = useState<number>(1);
  const [bet, setBet] = useState<number>(1);
  const [money, setMoney] = useState<number>(100);

  const [startRound, setStartRound] = useState<boolean>(false);
  const [endRound, setEndRound] = useState<boolean>(false);
  const [winRound, setWinRound] = useState<boolean>(false);
  const [loseRound, setLoseRound] = useState<boolean>(false);
  const [roundId, setRoundId] = useState<number>();
  const [betId, setBetId] = useState<number>();

  const [isBet, setIsBet] = useState<boolean>(false);

  const clearGame = () => {
    setStartRound(false);
    setEndRound(false);
    setWinRound(false);
    setLoseRound(false);
    setMultiply(1);
  };

  const getMoney = async () => {
    const tgMock = {
      userId: '1234567',
      userGame: 'aviator',
      userChat: '1234567',
      hash: '69f45e0b30510528064f2cac2de94c44',
    };
    const tgData = {
      ...tg.initParams,
      userGame: 'aviator',
    };

    axios.post(process.env.REACT_APP_API_URL + '/user-info', tgMock).then((res) => {
      setMoney(res.data.balance);
    });
  };

  useEffect(() => {
    const tgMock = {
      userId: '1234567',
      userGame: 'aviator',
      userChat: '1234567',
      hash: '69f45e0b30510528064f2cac2de94c44',
    };
    const tgData = {
      ...tg.initParams,
      userGame: 'aviator',
    };
    axios
      .post(
        process.env.REACT_APP_API_URL + '/user-info',
        process.env.REACT_APP_WS_URI === 'development' ? tgMock : tgData,
      )
      .then((res) => {
        setMoney(res.data.balance);
      });
  }, [endRound, winRound, loseRound]);

  const addBet = () => {
    setBet((prev) => prev + 10);
  };

  const minusBet = () => {
    if (bet > 10) {
      setBet((prev) => prev - 10);
    }
  };

  const share = async () => {
    const tgMock = {
      userId: '1234567',
      userGame: 'aviator',
      userChat: '1234567',
      hash: '69f45e0b30510528064f2cac2de94c44',
    };
    const tgData = {
      ...tg.initParams,
      userGame: 'aviator',
    };
    try {
      await axios
        .post(
          process.env.REACT_APP_API_URL + '/share',
          process.env.REACT_APP_WS_URI === 'development' ? tgMock : tgData,
        )
        .then((res) => {
          setMoney(res.data.balance);
        });
      tg.shareScore();
    } catch (error) {
      console.log(error);
    }
  };

  const startGame = async () => {
    try {
      if (startRound && isBet) {
        const data = {
          userId: '1234567',
          userGame: 'aviator',
          userChat: '1234567',
          hash: '69f45e0b30510528064f2cac2de94c44',
          roundId,
          betId,
        };
        const tgData = {
          ...tg.initParams,
          userGame: 'aviator',
          roundId,
          betId,
        };
        await axios.post(
          process.env.REACT_APP_API_URL + '/close',
          process.env.REACT_APP_WS_URI === 'development' ? data : tgData,
        );
        setIsBet(false);
      } else if (!startRound && !isBet) {
        const data = {
          amount: bet,
          userId: '1234567',
          userGame: 'aviator',
          userChat: '1234567',
          hash: '69f45e0b30510528064f2cac2de94c44',
        };
        const tgData = {
          ...tg.initParams,
          amount: bet,
          userGame: 'aviator',
        };

        const res = await axios.post(
          process.env.REACT_APP_API_URL + '/bet',
          process.env.REACT_APP_WS_URI === 'development' ? data : tgData,
        );
        setBetId(res.data.betId);
        setIsBet(true);
      }
    } catch (error) {
      setIsBet(false);
    }
  };

  useEffect(() => {
    const tgMock = {
      userId: '1234567',
      userName: 'Артем',
      userGame: 'aviator',
      userChat: '1234567',
      userMessage: 'AgAAAAFvBwBTcVITzMj0Y81zi3E',
      hash: '69f45e0b30510528064f2cac2de94c44',
    };
    const tgData = {
      ...tg.initParams,
      userGame: 'aviator',
    };

    const socket = io(wsUri, {
      autoConnect: true,
      path: '/socket.io/',
      transports: ['websocket', 'polling'],
      query: process.env.REACT_APP_WS_URI === 'development' ? tgMock : tgData,
    });

    socket.on('connect', () => {
      console.log('connect');

      socket.on('events', (events: SocketEvents) => {
        const { event, multiplier, roundId } = events;

        switch (event) {
          case Events.START_ROUND:
            clearGame();
            setStartRound(true);
            setMultiply(1);
            setRoundId(roundId);
            break;

          case Events.FINISH_ROUND:
            setEndRound(true);
            setStartRound(false);
            setMultiply(1);
            setIsBet(false);
            break;

          case Events.WIN:
            setWinRound(true);
            console.log('win');

            break;

          case Events.LOSE:
            setLoseRound(true);
            console.log('lose');

            break;

          case Events.TICK:
            setMultiply(multiplier);
            break;

          default:
            break;
        }
      });
    });

    setSocket(socket);
  }, []);

  return (
    <BasicLayouts>
      <div className="App-header relative z-50">
        {/* <Logo></Logo> */}
        {/* <span>Старт раунда {startRound ? 'true' : 'false'}</span>
        <span>Стоп раунда {endRound ? 'true' : 'false'}</span>
        <span>Победа раунда {winRound ? 'true' : 'false'}</span>
        <span>Поражение раунда {loseRound ? 'true' : 'false'}</span>
        <span>Multiply раунда {multiply}</span> */}
        <div className="flex flex-col absolute top-[100px]">
          {startRound ? (
            <PlayButton
              className="purpure-gradient button-play min-w-[145px]"
              onClick={startGame}
              text={`${multiply}X`}
              disabled={true}
            />
          ) : null}
        </div>
        <div className="flex flex-col gap-5 absolute bottom-[100px] items-center justify-center">
          <div className="relative bg-[#A77DFE] rounded-2xl w-[255px]">
            <Money
              classNameButton="!justify-start pl-[22px]"
              money={'Share and get +100'}
              classNameText="text-[16px] text-white"
              moneyHeight="18"
              moneyWidth="18"
            />
            <div className="absolute right-0 -top-1 w-[52px]">
              <PlayButton
                onClick={share}
                text="Share"
                className="button-play bg-[#67EB00] text-base px-[10px] tracking-[0.64px]"
              />
            </div>
          </div>
          {isBet ? (
            <OnGameReward money={bet * multiply} />
          ) : startRound ? (
            <BgButtons>
              <div className="text-xl uppercase font-bold whitespace-nowrap">Wait next round</div>
            </BgButtons>
          ) : (
            <>
              <div className="flex flex-col">
                <span className="text-xl font-bold uppercase">{'balance'}</span>

                <Money money={startRound ? bet : money} classNameText={'text-[43px]'} />
              </div>

              <Bets bet={bet} setBet={setBet} addBet={addBet} minusBet={minusBet} money={money} />
            </>
          )}
          {startRound ? (
            isBet ? (
              <BgButtons>
                <PlayButton
                  className="orange-gradient button-play whitespace-nowrap"
                  onClick={startGame}
                  text={'cash out'}
                />
              </BgButtons>
            ) : null
          ) : isBet ? (
            <BgButtons>
              <span className="text-xl uppercase font-bold whitespace-nowrap">Wait start round</span>
            </BgButtons>
          ) : (
            <PlayButton className="green-gradient button-play" onClick={startGame} text={'make bet'} />
          )}
        </div>
      </div>
    </BasicLayouts>
  );
};
export default BetsPage;
