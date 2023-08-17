import { FC } from 'react';
import { PropsBgButtons } from './BgButtons.interfaces';

const BgButtons: FC<PropsBgButtons> = ({ children }) => {
  return (
    <div className="relative flex justify-center items-center p-[30px]">
      <div className="z-50 relative">{children}</div>
      <div className="bg-button"></div>
    </div>
  );
};
export default BgButtons;
