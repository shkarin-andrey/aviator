import { FC } from 'react';
import Button from '../Button';
import Logo from '../Logo';

interface IStartView {
  onPlay: () => void;
}

const StartView: FC<IStartView> = ({ onPlay }) => {
  return (
    <>
      <div className="absolute left-1/2 top-[30%] -translate-x-1/2">
        <Logo>Aviator</Logo>
      </div>
      <Button onClick={onPlay} className="absolute left-1/2 top-[70%] -translate-x-1/2">
        play
      </Button>
    </>
  );
};

export default StartView;
