import { useState } from 'react';
import Game from '../components/Game';
import BasicLayouts from '../components/Layouts/BasicLayout';
import Logo from '../components/Logo';
import PlayButton from '../components/PlayButton';

const BetsPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const onClick = () => {
    setIsPlaying(true);
  };

  return (
    <BasicLayouts>
      <div className="App-header relative z-50 ">
        {isPlaying ? (
          <Game />
        ) : (
          <div className="flex flex-col justify-between h-screen py-[60px]">
            <Logo></Logo>
            <PlayButton className="green-gradient button-play" onClick={onClick} text={'PLAY'} />
          </div>
        )}
      </div>
    </BasicLayouts>
  );
};
export default BetsPage;
