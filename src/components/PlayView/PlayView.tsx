import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

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
import { setRate, setToggleRound } from '../../store/slices/globalSlice';

const PlayView: FC = () => {
  const dispatch = useDispatch();
  const startRound = useAppSelector((state) => state.global.startRound);
  const rate = useAppSelector((state) => state.global.rate);

  const [count, setCount] = useState(1);
  const [cash, setCash] = useState<number | null>(null);
  const [isWin, setIsWin] = useState<boolean | null>(null);
  const [endPlay, setEndPlay] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const rateCount = rate ? rate * count : 0;

  const valueIsSelected = rate ? 'Bet is selected' : 'Choose a bet to play';

  const classNemeStart = startRound && !showSuccess ? 'scale-[1.7] -rotate-[13deg]' : 'scale-100';
  const classNameSuccess = showSuccess ? 'top-[50%]' : 'top-[30%]';

  useEffect(() => {
    if (!startRound) return;

    const generateCount = Math.random() * 30 + 1;

    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= generateCount) {
          setEndPlay(true);

          setTimeout(() => {
            dispatch(setToggleRound(false));
            dispatch(setRate(null));
            setCount(1);
            setCash(null);
            setIsWin(null);
            setEndPlay(false);
          }, 4_000);

          clearInterval(interval);

          return prev;
        }

        return prev + 0.1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [startRound]);

  useEffect(() => {
    if (isWin && endPlay) {
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 4_000);
    }
  }, [isWin, endPlay]);

  const handleCashOut = () => {
    setIsWin(true);
    setCash(rateCount);
  };

  return (
    <>
      {showSuccess && (
        <div className="absolute left-1/2 -translate-x-1/2 top-[30%] flex flex-col gap-5">
          <Success winCount={count.toFixed(1)} reward={cash?.toFixed(1) || ''} />
        </div>
      )}
      <div className={`absolute left-1/2 -translate-x-1/2 flex flex-col gap-5 transition-all ${classNameSuccess}`}>
        {startRound && !showSuccess && (
          <>
            {endPlay && (
              <div className="text-white font-bold text-[20px] translate-y-[18px] leading-none uppercase tracking-[2px] text-center">
                FLEW AWAY!
              </div>
            )}
            <Button type={typeButtonOfNumber(count)} className="lowercase">
              {count.toFixed(1)}x
            </Button>
          </>
        )}
        <AirPlainIcon className={`transition-all duration-200 ${classNemeStart}`} />
      </div>
      {startRound && rate && isWin !== false && !endPlay && (
        <div className="absolute left-1/2 top-[70%] -translate-x-1/2 w-[150px] flex flex-col gap-4 justify-center">
          {cash && <LostReward count={rateCount - cash} />}
          <BetWrapper color="#11BBE1" title={cash ? 'claim Reward' : 'Reward'}>
            <div className="text-center text-[#7454FD] text-[40px] font-bold leading-none tracking-[1.2px]">
              ${(cash || rateCount).toFixed(1)}
            </div>
          </BetWrapper>
          {(!cash || !isWin) && !endPlay && (
            <Button onClick={handleCashOut} type="orange" className="px-[15px]">
              Cash out
            </Button>
          )}
        </div>
      )}

      <div className="absolute left-1/2 -translate-x-1/2 bottom-[10%] w-[260px] flex flex-col gap-3">
        {endPlay && !isWin && rate && <Fail />}
        {(!startRound || (startRound && !rate) || (endPlay && isWin)) && <Balance balance={500} />}
        {(!startRound || (startRound && !rate) || (endPlay && isWin)) && (
          <BetWrapper text={!startRound ? valueIsSelected : ''}>
            {startRound && !rate && (
              <div className="text-[#5754FD] text-[20px] font-bold text-center tracking-[0.8px] px-5 uppercase">
                Wait until the end of the round to make a bet
              </div>
            )}
            {(!startRound || (endPlay && isWin)) && <RateBtnList />}
          </BetWrapper>
        )}
      </div>
    </>
  );
};

export default PlayView;
