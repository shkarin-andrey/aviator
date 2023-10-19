import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import CoinRewardIcon from '../../assets/svg/CoinRewardIcon';
import SuccessIcon from '../../assets/svg/SuccessIcon';
import { useTelegramGameProxy } from '../../hooks/use-telegram-game-proxy';
import { Events } from '../../interfaces/events.enum';
import { SocketEvents } from '../../interfaces/SocketEvent';
import { RootState } from '../../store';
import {
  dispatchClearGame,
  dispatchEndGame,
  dispatchEndRound,
  dispatchLoseRound,
  dispatchResetFlight,
  dispatchStartRound,
  dispatchWinRound,
} from '../../store/slices/globalSlice';
import Bets from '../Bets';
import BgButtons from '../BgButtons';
import BasicLayouts, { GameContext } from '../Layouts/BasicLayout';
import Modal from '../Modal';
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
  const dispatch = useDispatch();
  const { endRound: stateEndRound } = useSelector((state: RootState) => state.global);

  const [isBet, setIsBet] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const onChangeModal = () => {
    setShowModal(!showModal);
  };

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
      if (money < 10) {
        onChangeModal();
      } else {
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
      }
    } catch (error) {
      setIsBet(false);
    }
  };

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (endRound) {
      if (winRound) {
        dispatch(dispatchWinRound());
      }
      dispatch(dispatchEndGame());
      timerId = setTimeout(() => {
        dispatch(dispatchClearGame());
      }, 1000);
    }

    return () => clearTimeout(timerId);
  }, [endRound]);

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
            dispatch(dispatchStartRound());
            break;

          case Events.FINISH_ROUND:
            setEndRound(true);
            dispatch(dispatchEndRound());
            dispatch(dispatchResetFlight());

            setTimeout(() => {
              dispatch(dispatchEndRound());
              dispatch(dispatchResetFlight());
              setStartRound(false);
              setMultiply('1.00');
              setIsBet(false);
              setCloseBet(false);
              setBet(10);
            }, 2000);

            break;

          case Events.WIN:
            setWinRound(true);
            setWinAmount(amount);
            setWinMultiply(String(multiplier));

            break;

          case Events.LOSE:
            setLoseRound(true);
            dispatch(dispatchLoseRound());

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
              winRound && endRound && !stateEndRound ? '!visible !scale-150' : ''
            }`}
          >
            <div
              className={`absolute scale-0 transition-all duration-1000 ease-out -top-[45px] ${
                winRound && endRound && !stateEndRound ? '!scale-150' : ''
              }  left-[55%] -translate-x-[55%]`}
            >
              <SuccessIcon
                width={winRound && endRound && !stateEndRound ? '75' : '0'}
                height={winRound && endRound && !stateEndRound ? '50' : '0'}
              />
            </div>
            <div className="bg-white flex flex-row rounded-xl p-2 justify-between gap-3">
              <div className="flex flex-col justify-center items-center">
                <span className={`text-[#60CFFF] text-[10px]  whitespace-nowrap`}>Win factor</span>
                <div className="bg-[#C2FDFF] text-[12px] font-bold text-center rounded-xl text-[#228AED] min-w-[50px]">
                  {winMultiply} X
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <span className="text-[#60CFFF] text-[10px] whitespace-nowrap tracking-[0.8px]">Reward</span>
                <div className="bg-[#C2FDFF] text-[12px] font-bold text-center rounded-xl text-[#228AED] flex flex-row gap-1 justify-center items-center min-w-[50px]">
                  <CoinRewardIcon height="7.5" width="10" />
                  <span className="tracking-[1.2px]">{Math.floor(winAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 absolute bottom-[50px] items-center justify-center">
          {isBet ? (
            closeBet ? (
              <>
                <div className="flex flex-col justify-center items-center gap-4">
                  <div className="flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-[#DFF9FF] uppercase">lost reward</span>
                    <Money
                      money={Math.floor(Number(multiply) * bet)}
                      classNameText="text-[40px] text-white"
                      moneyHeight="18"
                      moneyWidth="18"
                    />
                  </div>
                  <OnGameReward money={winAmount} text={'claim reward'} />
                </div>
              </>
            ) : (
              <OnGameReward money={bet * Number(multiply)} text={'reward'} />
            )
          ) : startRound ? (
            <>
              <div className="relative bg-[#A77DFE] rounded-2xl w-[270px]">
                <Money
                  classNameButton="!justify-start pl-[22px] w-[270px]"
                  money={'Share and get +100'}
                  classNameText="text-[14px] text-white"
                  moneyHeight="18"
                  moneyWidth="18"
                />
                <div className="absolute right-0 -top-1 w-[84px]">
                  <PlayButton
                    onClick={share}
                    text="Share"
                    className="button-play bg-[#67EB00] text-base !px-[10px] tracking-[0.64px]"
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
                <span className="text-xl font-bold uppercase tracking-[0.8px] text-[#DFF9FF]">balance</span>

                <Money money={startRound ? bet : money} classNameText={'text-[43px] tracking-[1.29px]'} />
              </div>
              <div className="flex w-full justify-center">
                <div className="relative bg-[#A77DFE] rounded-2xl w-full">
                  <Money
                    classNameButton="!justify-start pl-[22px] !w-[270px]"
                    money={'Share and get +100'}
                    classNameText="text-[14px] text-white"
                    moneyHeight="18"
                    moneyWidth="18"
                  />
                  <div className="absolute right-0 -top-1 w-[84px]">
                    <PlayButton
                      onClick={share}
                      text="Share"
                      className="button-play bg-[#67EB00] text-base !px-[10px] tracking-[0.64px]"
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
        {showModal ? <Modal share={share} onChangeModal={onChangeModal} money={money} /> : null}
      </div>
    </BasicLayouts>
  );
};
export default BetsPage;
