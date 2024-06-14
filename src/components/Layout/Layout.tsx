import { FC, ReactNode, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { setToggleRound } from '../../store/slices/globalSlice';
import TopBar from '../TopBar';

interface ILayout {
  children: ReactNode;
  isPlaying: boolean;
}

const Layout: FC<ILayout> = ({ children, isPlaying }) => {
  const [time, setTime] = useState(15);

  const dispatch = useAppDispatch();
  const startRound = useAppSelector((state) => state.global.startRound);

  useEffect(() => {
    if (startRound) {
      setTime(15);
      return;
    }

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) {
          dispatch(setToggleRound(true));
          return prev;
        }
        return prev - 1;
      });
    }, 1_000);

    return () => clearInterval(interval);
  }, [startRound]);

  const classNameIsPlaying = isPlaying ? 'to-[#231451]' : 'to-[#9C59FE]';

  return (
    <div className={`overflow-hidden h-screen bg-gradient-to-t from-[#6F53FD] ${classNameIsPlaying}`}>
      {isPlaying && (
        <>
          <div className="absolute left-0 top-0 w-full h-[70%] stars" />
          <TopBar time={time} isStart={startRound} className="absolute left-0 top-[6%] z-10" />
        </>
      )}
      {children}
    </div>
  );
};

export default Layout;
