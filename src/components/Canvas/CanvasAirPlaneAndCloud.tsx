import { useEffect, useRef } from 'react';
import { cloud, cloudSmall } from './Cloud';
import { getAnimateCloud } from './helper';

const CanvasAirPlaneAndCloud = (props: any) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
      image.src = `data:image/svg+xml;base64,${window.btoa(cloud)}`;
      smallCloud.src = `data:image/svg+xml;base64,${window.btoa(cloudSmall)}`;

      getAnimateCloud({
        canvas: canvasRef,
        imageArray: [
          {
            image,
            size: { width: 40, height: 20 },
            startPos: { x: 200, y: 0 },
          },
          {
            image: smallCloud,
            size: { width: 20, height: 10 },
            startPos: { x: 300, y: 40 },
          },
          {
            image: smallCloud,
            size: { width: 20, height: 10 },
            startPos: { x: 20, y: 50 },
          },
          {
            image: image,
            size: { width: 40, height: 20 },
            startPos: { x: 90, y: 40 },
          },
          {
            image: image,
            size: { width: 40, height: 20 },
            startPos: { x: 240, y: 120 },
          },
          {
            image: smallCloud,
            size: { width: 20, height: 10 },
            startPos: { x: 80, y: 160 },
          },
          {
            image: smallCloud,
            size: { width: 20, height: 10 },
            startPos: { x: 300, y: 165 },
          },
        ],
      });
    }
  }, []);

  return <canvas width={window.innerWidth} height={200} ref={canvasRef} {...props} />;
};

export default CanvasAirPlaneAndCloud;
