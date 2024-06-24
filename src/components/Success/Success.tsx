import { FC } from 'react';
import { ReactComponent as SuccessIcon } from '../../assets/svg/success.svg';
import { ISuccess } from './Success.interface';

const Success: FC<ISuccess> = ({ winCount, reward }) => {
  return (
    <div className="relative py-3 px-[20px] rounded-[20px] bg-white flex gap-[20px]">
      <SuccessIcon className="absolute left-1/2 -translate-x-1/2 -top-[65px]" />
      <div className="flex flex-col items-start">
        <div className="text-[#60CFFF] font-bold text-[18px] leading-none ml-3">Win factor</div>
        <div className="px-7 py-1 rounded-full text-[24px] font-bold text-[#228AED] bg-[#C2FDFF] leading-none whitespace-nowrap">
          {winCount} x
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="text-[#60CFFF] font-bold text-[18px] leading-none mr-4">Reward</div>
        <div className="px-7 py-1 rounded-full text-[24px] font-bold text-[#228AED] bg-[#C2FDFF] leading-none whitespace-nowrap">
          $ {reward}
        </div>
      </div>
    </div>
  );
};

export default Success;
