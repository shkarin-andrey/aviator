import React, { createContext, FC, useCallback, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ChildrenProps } from '../../interfaces/childrenProps';
import { PropsGameContext } from '../../interfaces/GameContext.interfaces';
import Canvas from '../Canvas';
import CanvasAirPlaneAndCloud from '../Canvas/CanvasAirPlaneAndCloud';

export const GameContext = createContext<PropsGameContext>({
  startScreen: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onStartScreen: () => {},
});

const BasicLayouts: FC<ChildrenProps> = ({ children }) => {
  const [startScreen, setStartScreen] = useState(false);

  const onStartScreen = useCallback(() => {
    setStartScreen(true);
  }, []);

  const value = useMemo(() => {
    return { startScreen, onStartScreen };
  }, [startScreen]);

  return (
    <div>
      <GameContext.Provider value={value}>
        <>
          <Outlet />
          {children}
          <Canvas
            className={`w-full h-screen absolute top-0 z-10 left-0 ${
              !startScreen ? 'bg_canvas-game' : 'bg_canvas-start'
            }`}
          />
          <CanvasAirPlaneAndCloud className={`w-full absolute top-[30%] z-20 left-0 right-0`} />
        </>
      </GameContext.Provider>
    </div>
  );
};

export default React.memo(BasicLayouts);
