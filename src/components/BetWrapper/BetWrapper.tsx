import { FC } from 'react';

interface IBetWrapper {
  children: React.ReactNode;
  text?: string;
  title?: string;
  color?: string;
}

const BetWrapper: FC<IBetWrapper> = ({ children, text, title = 'bet', color = '#5754FD' }) => {
  return (
    <div className="relative">
      <div
        className="rounded-lg overflow-hidden"
        style={{
          boxShadow: '0px 4.438px 0px 0px rgba(0, 0, 0, 0.15), 0px 2.219px 0px 0px #3ECEFE',
        }}
      >
        <div
          className="uppercase font-bold tracking-[0.8px] leading-none text-[22px] text-white text-center pt-1 pb-[5px]"
          style={{ background: color }}
        >
          {title}
        </div>
        <div className="px-[15px] py-[14px] bg-white">{children}</div>
      </div>
      {text && (
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-[28px] w-full text-center text-[#D0B4FF] font-bold text-[16px] tracking-[0.6px]">
          {text}
        </div>
      )}
    </div>
  );
};

export default BetWrapper;
