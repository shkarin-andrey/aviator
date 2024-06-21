import { useInitDataRaw } from '@tma.js/sdk-react';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useGetUserInfoMutation } from '../../store/api/apiGameSlice';
import { setToggleRound } from '../../store/slices/globalSlice';
import TopBar from '../TopBar';
import { ILayout } from './Layout.interface';

const Layout: FC<ILayout> = ({ children, isPlaying }) => {
  const [getUserInfo, { data: userInfoData, isLoading }] = useGetUserInfoMutation();

  const [time, setTime] = useState(15);

  const initData = useInitDataRaw();
  const dispatch = useAppDispatch();
  const startRound = useAppSelector((state) => state.global.startRound);

  console.log(initData);

  useEffect(() => {
    const body = {
      webAppData:
        'query_id=AAEVg2JJAgAAABWDYknAaiaD&user=%7B%22id%22%3A5526160149%2C%22first_name%22%3A%22P000-%F0%9F%8E%9E%D0%92%D0%BB%D0%B0%D0%B4%D0%B8%D0%BC%D0%B8%D1%80%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22r000vladimir%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1718486786&hash=e655b107342baed3bcfd2debfa3ca330f4a5d401927a6b6b3412562783c23bf8',
      userGame: 'aviator',
    };
    getUserInfo(body)
      .unwrap()
      .catch((error) => {
        alert(error.data.message);
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
