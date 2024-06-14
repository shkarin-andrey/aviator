import { FC } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setRate } from '../../store/slices/globalSlice';
import Button from '../Button';

const RateBtnList: FC = () => {
  const rate = useAppSelector((state) => state.global.rate);
  const dispatch = useAppDispatch();

  const handleStart = (number: number) => {
    dispatch(setRate(number));
  };

  return (
    <div className="flex items-center justify-between gap-2.5">
      <Button
        onClick={() => handleStart(1)}
        isFill
        type={rate === 1 ? 'purple' : 'blue'}
        disabled={!!rate && rate !== 1}
        className="!px-0 w-full rounded-[14px] after:rounded-[14px]"
      >
        $1
      </Button>
      <Button
        onClick={() => handleStart(2)}
        isFill
        type={rate === 2 ? 'purple' : 'blue'}
        disabled={!!rate && rate !== 2}
        className="!px-0 w-full rounded-[14px] after:rounded-[14px]"
      >
        $2
      </Button>
      <Button
        onClick={() => handleStart(5)}
        isFill
        type={rate === 5 ? 'purple' : 'blue'}
        disabled={!!rate && rate !== 5}
        className="!px-0 w-full rounded-[14px] after:rounded-[14px]"
      >
        $5
      </Button>
    </div>
  );
};

export default RateBtnList;
