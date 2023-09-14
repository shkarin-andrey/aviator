import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { airplane } from './Airplane';
import { getAnimateAirPlane } from './helper';

const CanvasAirPlane = (props: any) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { loseRound, winRound, startRound, endGame, endRound } = useSelector((state: RootState) => state.global);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx == null) return;

      const imageAirplane = new Image(120, 52);

      imageAirplane.src = `data:image/svg+xml;base64,${window.btoa(airplane)}`;

      getAnimateAirPlane({
        canvas: canvasRef,
        endGame,
        startRound,
        endRound,
        airplane: imageAirplane,
        airplanePos: { x: ctx.canvas.width / 2 - 80, y: ctx.canvas.height / 2 - 52 },
      });
    }
  }, [endGame, endRound]);

  return <canvas width={window.innerWidth} height={300} ref={canvasRef} {...props} />;
};

export default CanvasAirPlane;
