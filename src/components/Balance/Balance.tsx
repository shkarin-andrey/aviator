import { FC } from 'react';
import ModalWithdraw from '../ModalWithdraw';

interface IBalance {
  balance: number;
}

const Balance: FC<IBalance> = ({ balance }) => {
  return (
    <div
      className="px-3.5 py-2 flex items-center tracking-[0.8px] justify-between bg-[#5754FD] rounded-full"
      style={{
        boxShadow: '0px 4.438px 0px 0px rgba(0, 0, 0, 0.15)',
      }}
    >
      <div className="text-[26px] text-white font-bold">Balance: ${balance}</div>
      <ModalWithdraw balance={balance} />
    </div>
  );
};

export default Balance;
