import { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import useInitDataApi from '../../hooks/useInitDataApi';
import { useGetUserInfoMutation } from '../../store/api/apiGameSlice';
import { setToggleRound } from '../../store/slices/globalSlice';
import TopBar from '../TopBar';
import { ILayout } from './Layout.interface';

const Layout: FC<ILayout> = ({ children, isPlaying }) => {
  const [getUserInfo, { data: userInfoData }] = useGetUserInfoMutation();

  const [time, setTime] = useState(15);

  const defaultApiBody = useInitDataApi();
  const dispatch = useAppDispatch();
  const startRound = useAppSelector((state) => state.global.startRound);

  useEffect(() => {
    getUserInfo(defaultApiBody)
      .unwrap()
      .catch((error) => {
        // alert(error.data.message);
        console.log(error);
      });
  }, []);

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
          <TopBar
            history={userInfoData?.rounds || []}
            time={time}
            isStart={startRound}
            className="absolute left-0 top-[6%] z-10"
          />
        </>
      )}
      {children}
    </div>
  );
};

export default Layout;
