import { useEffect, useRef } from 'react';
import { cloud } from './Cloud';

const Canvas = (props: any) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      //Our first draw
      if (ctx == null) return;
      const grd = ctx.createLinearGradient(0, 0, ctx.canvas.width, ctx.canvas.height);
      grd.addColorStop(0, '#9C59FE');
      grd.addColorStop(1, '#6F53FD');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      const image = new Image(60, 40);
      // image.src = cloud;
      image.src = `data:image/svg+xml;base64,${window.btoa(cloud)}`;

      const images = document.getElementById('cloud') as HTMLImageElement;

      image.onload = () => {
        // ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
        // ctx.drawImage(image, 0.3, 0.5);
        ctx.drawImage(image, 44, 23, 60, 40);
        if (images == null) return;

        ctx.drawImage(images, 0, 0);
      };
    }
  }, []);

  return <canvas width={window.innerWidth} height={window.innerHeight} ref={canvasRef} {...props} />;
};

export default Canvas;
