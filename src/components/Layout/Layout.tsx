import { FC, useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { GameEvents } from '../../interfaces/GameEvents.enum';
import TopBar from '../TopBar';
import { ILayout } from './Layout.interface';

const Layout: FC<ILayout> = ({ children, isPlaying }) => {
  const [time, setTime] = useState(15);

  const type = useAppSelector((state) => state.global.type);
  const rounds = useAppSelector((state) => state.global.rounds);

  const isNotStart = type === GameEvents.FINISH_ROUND || type === GameEvents.LOSE;

  useEffect(() => {
    if (!isNotStart) {
      setTime(15);
      return;
    }

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) return prev;

        return prev - 1;
      });
    }, 1_000);

    return () => clearInterval(interval);
  }, [isNotStart]);

  const classNameIsPlaying = isPlaying ? 'to-[#231451]' : 'to-[#9C59FE]';

  return (
    <div className={`overflow-hidden h-screen bg-gradient-to-t from-[#6F53FD] ${classNameIsPlaying}`}>
      {isPlaying && (
        <>
          <div className="absolute left-0 top-0 w-full h-[70%] stars" />
          <TopBar history={rounds} time={time} isStart={!isNotStart} className="absolute left-0 top-[6%] z-10" />
        </>
      )}
      {children}
    </div>
  );
};

export default Layout;
