import { useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { GameContext } from '../Layouts/BasicLayout';
import { airplane } from './Airplane';
import { cloud, cloudSmall } from './Cloud';
import { getAnimateCloud } from './helper';

const CanvasAirPlaneAndCloud = (props: any) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const context = useContext(GameContext);
  const loseRound = useSelector((state: RootState) => state.global.loseRound);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      //Our first draw
      if (ctx == null) return;
      // const grdStart = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);
      // const grdGame = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);

      // grdGame.addColorStop(0, '#231451');
      // grdGame.addColorStop(1, '#8055FD');
      // grdStart.addColorStop(0, '#9C59FE');
      // grdStart.addColorStop(1, '#6F53FD');

      // if (context.startScreen) {
      //   ctx.fillStyle = grdStart;
      //   ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      // } else {
      //   ctx.fillStyle = grdGame;
      //   ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      // }

      const image = new Image(40, 20);
      const smallCloud = new Image(20, 10);
      const imageAirplane = new Image(120, 52);

      image.src = `data:image/svg+xml;base64,${window.btoa(cloud)}`;
      smallCloud.src = `data:image/svg+xml;base64,${window.btoa(cloudSmall)}`;

      imageAirplane.src = `data:image/svg+xml;base64,${window.btoa(airplane)}`;

      getAnimateCloud({
        canvas: canvasRef,
        imageArray: [
          {
            image,
            size: { width: 40, height: 20 },
            startPos: { x: 200, y: 0 },
            initValue: { x: 200, y: 0 },
            small: false,
          },
          {
            image: smallCloud,
            size: { width: 20, height: 10 },
            startPos: { x: 300, y: 40 },
            initValue: { x: 300, y: 40 },
            small: true,
          },
          {
            image: smallCloud,
            size: { width: 20, height: 10 },
            startPos: { x: 20, y: 50 },
            initValue: { x: 20, y: 50 },
            small: true,
          },
          {
            image: image,
            size: { width: 40, height: 20 },
            startPos: { x: 90, y: 50 },
            initValue: { x: 90, y: 50 },
            small: false,
          },
          {
            image: image,
            size: { width: 40, height: 20 },
            startPos: { x: 240, y: 100 },
            initValue: { x: 240, y: 100 },
            small: false,
          },
          {
            image: smallCloud,
            size: { width: 20, height: 10 },
            startPos: { x: 80, y: 160 },
            initValue: { x: 80, y: 160 },
            small: true,
          },
          {
            image: smallCloud,
            size: { width: 20, height: 10 },
            startPos: { x: 300, y: 165 },
            initValue: { x: 300, y: 165 },
            small: true,
          },
        ],
        startGame: true,
      });
    }
  }, []);

  return <canvas width={window.innerWidth} height={300} ref={canvasRef} {...props} />;
};

export default CanvasAirPlaneAndCloud;
