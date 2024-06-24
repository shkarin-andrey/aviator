import { FC, useEffect, useState } from 'react';

import { useAppSelector } from '../../hooks/useAppSelector';
import { typeButtonOfNumber } from '../../utils/typeButtonOfNumber';

import Balance from '../Balance';
import BetWrapper from '../BetWrapper';
import Button from '../Button';
import Fail from '../Fail';
import LostReward from '../LostReward';
import RateBtnList from '../RateBtnList';
import Success from '../Success';

import { ReactComponent as AirPlainIcon } from '../../assets/svg/air-plane.svg';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import useInitDataApi from '../../hooks/useInitDataApi';
import { GameEvents } from '../../interfaces/GameEvents.enum';
import { useCloseMutation } from '../../store/api/apiGameSlice';
import { setCash, setFlewAway } from '../../store/slices/globalSlice';

const PlayView: FC = () => {
  const [close] = useCloseMutation();

  const dispatch = useAppDispatch();

  const startRound = useAppSelector((state) => state.global.startRound);
  const rate = useAppSelector((state) => state.global.rate);
  const multiplier = useAppSelector((state) => state.global.multiplier);
  const type = useAppSelector((state) => state.global.type);
  const balance = useAppSelector((state) => state.global.balance);
  const roundId = useAppSelector((state) => state.global.roundId);
  const betId = useAppSelector((state) => state.global.betId);
  const cash = useAppSelector((state) => state.global.cash);
  const flewAway = useAppSelector((state) => state.global.flewAway);
  const defaultApiBody = useInitDataApi();

  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showLose, setShowLose] = useState<boolean>(false);
  const [winCount, setWinCount] = useState(1);

  const rateCount = rate && multiplier ? rate * multiplier : 0;

  const valueIsSelected = rate ? 'Bet is selected' : 'Choose a bet to play';

  const isFinish = type === GameEvents.FINISH_ROUND;
  const isWin = type === GameEvents.WIN;
  const isLose = type === GameEvents.LOSE;
  const isTick = type === GameEvents.TICK;

  const classNemeStart = !isFinish && !isLose ? 'scale-[1.7] -rotate-[13deg]' : 'scale-100';
  const classNameSuccess = showSuccess ? 'top-[50%]' : 'top-[30%]';
  const classNameEndRound = isFinish || isLose ? 'air-animate' : '';

  useEffect(() => {
    if (isWin) {
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 4_000);
    }
  }, [isWin]);

  useEffect(() => {
    if (!isFinish) return;

    setTimeout(() => {
      dispatch(setCash(undefined));
      dispatch(setFlewAway(false));
    }, 4_000);
  }, [isFinish]);

  useEffect(() => {
    if (isLose) {
      setShowLose(true);

      setTimeout(() => {
        setShowLose(false);
        setWinCount(1);
      }, 4_000);
    }
  }, [isLose]);

  const handleCashOut = () => {
    const body = {
      ...defaultApiBody,
      betId: betId || '',
      roundId: roundId || '',
    };

    close(body)
      .unwrap()
      .then(() => {
        setWinCount(multiplier || 1);
      });
  };

  return (
    <>
      {showSuccess && multiplier && (
        <div className="absolute left-1/2 -translate-x-1/2 top-[30%] flex flex-col gap-5">
          <Success winCount={winCount} reward={cash || 0} />
        </div>
      )}
      <div
        className={`absolute left-1/2 -translate-x-1/2 flex flex-col gap-5 transition-all air-animate-infinite ${classNameSuccess}`}
      >
        {((!isFinish && !isLose) || flewAway) && multiplier && (
          <>
            {flewAway && (
              <div className="text-white font-bold text-[20px] translate-y-[18px] leading-none uppercase tracking-[2px] text-center">
                FLEW AWAY!
              </div>
            )}
            <Button type={typeButtonOfNumber(multiplier)} className="lowercase">
              {multiplier}x
            </Button>
          </>
        )}
        <AirPlainIcon className={`transition-all duration-200 ${classNemeStart} ${classNameEndRound}`} />
      </div>
      {rate && isTick && (
        <div className="absolute left-1/2 top-[70%] -translate-x-1/2 w-[150px] flex flex-col gap-4 justify-center">
          {cash && <LostReward count={rateCount - cash} />}
          <BetWrapper color="#11BBE1" title={cash ? 'claim Reward' : 'Reward'}>
            <div className="text-center text-[#7454FD] text-[40px] font-bold leading-none tracking-[1.2px]">
              ${(cash || rateCount).toFixed(1)}
            </div>
          </BetWrapper>
          {!cash && (
            <Button onClick={handleCashOut} type="orange" className="px-[15px]">
              Cash out
            </Button>
          )}
        </div>
      )}

      <div className="absolute left-1/2 -translate-x-1/2 bottom-[10%] w-[260px] flex flex-col gap-3">
        {showLose && <Fail />}
        {(!startRound || (startRound && !rate)) && !showLose && (
          <>
            <Balance balance={balance} />
            <BetWrapper text={!startRound ? valueIsSelected : ''}>
              {isTick && !rate && (
                <div className="text-[#5754FD] text-[20px] font-bold text-center tracking-[0.8px] px-5 uppercase">
                  Wait until the end of the round to make a bet
                </div>
              )}
              {!startRound && !isTick && <RateBtnList />}
            </BetWrapper>
          </>
        )}
      </div>
    </>
  );
};

export default PlayView;
