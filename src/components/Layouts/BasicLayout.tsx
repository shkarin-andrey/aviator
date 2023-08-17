import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ChildrenProps } from '../../interfaces/childrenProps';
import Canvas from '../Canvas';

const BasicLayouts: FC<ChildrenProps> = ({ children }) => {
  return (
    <div>
      <>
        <Outlet />

        {children}
        <Canvas className="w-full h-screen absolute top-0 z-10 left-0" />
      </>
    </div>
  );
};

export default BasicLayouts;
