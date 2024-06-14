import { FC } from 'react';
import ModalWithdraw from '../ModalWithdraw';

const Balance: FC = () => {
  return (
    <div
      className="px-3.5 py-2 flex items-center justify-between bg-[#5754FD] rounded-full"
      style={{
        boxShadow: '0px 4.438px 0px 0px rgba(0, 0, 0, 0.15)',
      }}
    >
      <div className="text-[26px] text-white font-bold">Balance: $50</div>
      <ModalWithdraw />
    </div>
  );
};

export default Balance;
