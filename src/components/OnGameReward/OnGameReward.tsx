import { FC } from 'react';
import Money from '../Money';
import { PropsOnGameReward } from './OnGameReward.interfaces';

const OnGameReward: FC<PropsOnGameReward> = (props) => {
  const { money, text } = props;

  return (
    <div className="flex flex-col bg-white rounded-[7px] shadow-bets mb-3 min-w-[150px] items-center justify-center">
      <div className="w-full bg-[#3ECEFE] text-white rounded-t-[7px] text-center text-lg px-3 font-bold uppercase whitespace-nowrap">
        {text}
      </div>
      <div className="flex flex-row w-full pl-4 items-center justify-center py-2">
        <div className="flex items-center justify-start">
          <Money
            money={Math.floor(money)}
            classNameText="text-[40px] text-[#7454FD]"
            moneyHeight="18"
            moneyWidth="18"
          />
        </div>
      </div>
    </div>
  );
};

export default OnGameReward;
