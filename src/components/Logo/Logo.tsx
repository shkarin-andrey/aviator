import { FC } from 'react';
import { TLogo } from './Logo.interface';

const Logo: FC<TLogo> = ({ children }) => {
  return (
    <h1
      className="text-[#FFDB0A] text-[80px] uppercase tracking-[3.2px] font-normal"
      style={{
        textShadow:
          '#643AC5 0px 2px 0px, #BE7CFB 3px 5px 0px, #BE7CFB -3px 5px 0px, #BE7CFB -3px -2px 0px, #BE7CFB 3px -2px 0px',
      }}
    >
      {children}
    </h1>
  );
};

export default Logo;
