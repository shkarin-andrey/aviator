import { FC } from 'react';
import { ReactComponent as LogoImg } from '../../assets/logo.svg';
import { PropsLogo } from './Logo.interfaces';

export const Logo: FC<PropsLogo> = ({ className }) => {
  return (
    <div className={className}>
      <LogoImg></LogoImg>
    </div>
  );
};

export default Logo;
