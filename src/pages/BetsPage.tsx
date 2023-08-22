import { useContext, useEffect, useState } from 'react';
import Game from '../components/Game';
import BasicLayouts, { GameContext } from '../components/Layouts/BasicLayout';
import Logo from '../components/Logo';
import PlayButton from '../components/PlayButton';

const Check = () => {
  const context = useContext(GameContext);
  useEffect(() => {
    context.onStartScreen();
  }, []);
  return <></>;
};

const BetsPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const onClick = () => {
    setIsPlaying(true);
  };

  return (
    <BasicLayouts>
      <div className="App-header relative z-50 ">
        {isPlaying ? (
          <>
            <Check></Check>
            <Game />
          </>
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
