import { FC } from 'react';
import { PropsButtonScaleBet } from './ButtonScaleBet.interfaces';

const ButtonScaleBet: FC<PropsButtonScaleBet> = (props) => {
  const { onClick, text, className } = props;

  return (
    <div>
      <button
        className={`${className} button-scale py-[6px] px-[14px] text-[16px] font-bold whitespace-nowrap`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default ButtonScaleBet;
