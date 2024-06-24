import { FC } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import useInitDataApi from '../../hooks/useInitDataApi';
import { TAmountBet } from '../../interfaces/UpdateBetRequest.interface';
import { useUpdateBetMutation } from '../../store/api/apiGameSlice';
import { setBalance, setBetId, setRate } from '../../store/slices/globalSlice';
import Button from '../Button';
import { listBtn } from './RateBtnList.config';

const RateBtnList: FC = () => {
  const [updateBet] = useUpdateBetMutation();

  const rate = useAppSelector((state) => state.global.rate);
  const dispatch = useAppDispatch();

  const defaultApiBody = useInitDataApi();

  const handleStart = (number: TAmountBet) => {
    if (rate === number) return;

    const body = {
      ...defaultApiBody,
      amount: number,
    };

    updateBet(body)
      .unwrap()
      .then(({ betId, balance }) => {
        dispatch(setBalance(balance));
        dispatch(setBetId(betId));
      });
    dispatch(setRate(number));
  };

  return (
    <div className="flex items-center justify-between gap-2.5">
      {listBtn.map((item) => (
        <Button
          key={item}
          onClick={() => handleStart(item)}
          isFill
          type={rate === item ? 'purple' : 'blue'}
          disabled={!!rate && rate !== item}
          className="!px-0 w-full rounded-[14px] after:rounded-[14px]"
        >
          ${item}
        </Button>
      ))}
    </div>
  );
};

export default RateBtnList;
