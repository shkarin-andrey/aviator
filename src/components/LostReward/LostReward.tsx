import { FC } from 'react';

interface ILostReward {
  count: number;
}

const LostReward: FC<ILostReward> = ({ count }) => {
  return (
    <div>
      <div className="text-[#DFF9FF] font-bold text-[20px] leading-none uppercase tracking-[1.2px] text-center">
        lost reward
      </div>
      <div className="text-white font-bold text-[44px] leading-none uppercase tracking-[0.8px] text-center">
        {count.toFixed(1)}
      </div>
    </div>
  );
};

export default LostReward;
