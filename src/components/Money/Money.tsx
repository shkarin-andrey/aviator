import { FC } from 'react';
import Coin from '../../assets/svg/Coin';
import { MoneyProps } from './Money.interfaces';

const Money: FC<MoneyProps> = (props) => {
  const { money, classNameText, moneyHeight, moneyWidth } = props;

  return (
    <div className="flex flex-row items-center gap-[6px] w-full justify-center">
      <span className={`${classNameText} font-bold leading-9`}>{money}</span>
      <Coin height={moneyHeight} width={moneyWidth} />
    </div>
  );
};

export default Money;
