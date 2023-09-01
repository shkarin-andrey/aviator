import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import CoinRewardIcon from '../../assets/svg/CoinRewardIcon';
import SuccessIcon from '../../assets/svg/SuccessIcon';
import { useTelegramGameProxy } from '../../hooks/use-telegram-game-proxy';
import { Events } from '../../interfaces/events.enum';
import { SocketEvents } from '../../interfaces/SocketEvent';
import Bets from '../Bets';
import BgButtons from '../BgButtons';
import BasicLayouts, { GameContext } from '../Layouts/BasicLayout';
import Money from '../Money';
import OnGameReward from '../OnGameReward';
import PlayButton from '../PlayButton';
import ProgressBar from '../ProgressBar';

const wsUri: string = process.env.REACT_APP_WS_URI || '';

const BetsPage = () => {
  const tg = useTelegramGameProxy();
  const [socket, setSocket] = useState<Socket>();
  const [multiply, setMultiply] = useState<string>('1.00');
  const [bet, setBet] = useState<number>(10);
  const [money, setMoney] = useState<number>(0);

  const [startRound, setStartRound] = useState<boolean>(false);
  const [endRound, setEndRound] = useState<boolean>(false);
  const [winRound, setWinRound] = useState<boolean>(false);
  const [loseRound, setLoseRound] = useState<boolean>(false);
  const [roundId, setRoundId] = useState<number>();
  const [betId, setBetId] = useState<number>();
  const [closeBet, setCloseBet] = useState<boolean>(false);
  const context = useContext(GameContext);
  const [winAmount, setWinAmount] = useState(0);
  const [winMultiply, setWinMultiply] = useState('0');

  const [isBet, setIsBet] = useState<boolean>(false);

  const clearGame = () => {
    setStartRound(false);
    setEndRound(false);
    setWinRound(false);
    setLoseRound(false);
    setMultiply('1.00');
    setCloseBet(false);
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
    await axios
      .post(process.env.REACT_APP_API_URL + '/user-info', process.env.NODE_ENV === 'development' ? tgMock : tgData)
      .then((res) => {
        setMoney(res.data.balance);
      });
  };

  useEffect(() => {
    getMoney();
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
      await axios.post(
        process.env.REACT_APP_API_URL + '/share',
        process.env.NODE_ENV === 'development' ? tgMock : tgData,
      );
      getMoney();
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
          process.env.NODE_ENV === 'development' ? data : tgData,
        );
        setCloseBet(true);
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
          process.env.NODE_ENV === 'development' ? data : tgData,
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
      query: process.env.NODE_ENV === 'development' ? tgMock : tgData,
    });

    socket.on('connect', () => {
      socket.on('events', (events: SocketEvents) => {
        const { event, multiplier, roundId, amount } = events;

        switch (event) {
          case Events.START_ROUND:
            clearGame();
            setStartRound(true);
            setMultiply('1.00');
            setRoundId(roundId);
            break;

          case Events.FINISH_ROUND:
            setEndRound(true);
            setStartRound(false);
            setMultiply('1.00');
            setIsBet(false);
            break;

          case Events.WIN:
            const multiplyWin = (amount / bet).toFixed(2);
            setWinRound(true);
            setWinAmount(amount);
            setWinMultiply(multiplyWin);

            break;

          case Events.LOSE:
            setLoseRound(true);

            break;

          case Events.TICK:
            if (!startRound) {
              setStartRound(true);
            }
            setMultiply(multiplier.toFixed(2));
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

        <div className="flex flex-col absolute top-[50px] items-center gap-[85px] justify-center">
          {startRound ? (
            <PlayButton
              className="purpure-gradient button-play min-w-[75px]"
              onClick={startGame}
              text={`${multiply}X`}
              disabled={true}
            />
          ) : (
            <div className="flex flex-col gap-[80px] justify-center items-center">
              <div className="flex flex-col min-w[220px] gap-[14px]">
                <span className="whitespace-nowrap text-xl font-bold tracking-[2px]">Time to next round</span>
                <ProgressBar />
              </div>
            </div>
          )}
          <div
            className={`relative w-fit invisible scale-0 transition-all duration-1000 ease-in-out ${
              winRound && endRound ? '!visible !scale-150' : ''
            }`}
          >
            <div
              className={`absolute scale-0 transition-all duration-1000 ease-out -top-[45px] ${
                winRound && endRound ? '!scale-150' : ''
              }  left-[55%] -translate-x-[55%]`}
            >
              <SuccessIcon width={winRound && endRound ? '75' : '0'} height={winRound && endRound ? '50' : '0'} />
            </div>
            <div className="bg-white flex flex-row rounded-xl p-2 justify-between gap-3">
              <div className="flex flex-col justify-center items-center">
                <span className={`text-[#60CFFF] text-[10px]  whitespace-nowrap`}>Win factor</span>
                <div className="bg-[#C2FDFF] text-[12px] font-bold text-center rounded-xl text-[#228AED] min-w-[50px]">
                  {winMultiply} X
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <span className="text-[#60CFFF] text-[10px] whitespace-nowrap">Reward</span>
                <div className="bg-[#C2FDFF] text-[12px] font-bold text-center rounded-xl text-[#228AED] flex flex-row gap-1 justify-center items-center min-w-[50px]">
                  <CoinRewardIcon height="7.5" width="10" />
                  <span>{Math.floor(winAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 absolute bottom-[50px] items-center justify-center">
          {isBet ? (
            closeBet ? (
              <BgButtons>
                <div className="text-xl uppercase font-bold whitespace-nowrap">Wait end round</div>
              </BgButtons>
            ) : (
              <OnGameReward money={bet * Number(multiply)} />
            )
          ) : startRound ? (
            <>
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

              <BgButtons>
                <div className="text-xl uppercase font-bold whitespace-nowrap">Wait next round</div>
              </BgButtons>
            </>
          ) : (
            <>
              <div className="flex flex-col">
                <span className="text-xl font-bold uppercase">balance</span>

                <Money money={startRound ? bet : money} classNameText={'text-[43px]'} />
              </div>
              <div className="flex w-full">
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
              </div>

              <Bets bet={bet} setBet={setBet} addBet={addBet} minusBet={minusBet} money={money} />
              <PlayButton className="green-gradient button-play" onClick={startGame} text={'make bet'} />
            </>
          )}
          {startRound ? (
            isBet ? (
              closeBet ? null : (
                <BgButtons>
                  <PlayButton
                    className="orange-gradient button-play whitespace-nowrap"
                    onClick={startGame}
                    text={'cash out'}
                  />
                </BgButtons>
              )
            ) : null
          ) : isBet && !closeBet ? (
            <BgButtons>
              <span className="text-xl uppercase font-bold whitespace-nowrap">Wait start round</span>
            </BgButtons>
          ) : null}
        </div>
      </div>
    </BasicLayouts>
  );
};
export default BetsPage;
