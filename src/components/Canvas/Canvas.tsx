import { useEffect, useRef } from 'react';

const Canvas = (props: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    }
  }, []);

  return <canvas width={window.innerWidth} height={window.innerHeight} ref={canvasRef} {...props} />;
};

export default Canvas;
