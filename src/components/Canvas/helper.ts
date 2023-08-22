type StartPosition = {
  x: number;
  y: number;
};

type SizeElement = {
  width: number;
  height: number;
};

type ImageArray = {
  image: HTMLImageElement;
  startPos: StartPosition;
  size: SizeElement;
};

interface DrawProps {
  canvas: React.MutableRefObject<HTMLCanvasElement | null>;
  rotation?: number;
  x?: number;
  // cloudImage: HTMLImageElement;
  // startPos: StartPosition;
  // size: SizeElement;
  imageArray: ImageArray[];
}

// export const draw = (props: DrawProps) => {
//   const { canvas, logoRef, rotation, x: xCord } = props;
//   const ctx = canvas?.current?.getContext('2d');
//   const logo = logoRef.current;
//   if (!ctx || !logo) {
//     return;
//   }
//   const canvasWidth = canvas.current!.width;
//   const canvasHeight = canvas.current!.height;
//   ctx.clearRect(0, 0, canvasWidth, canvasHeight);

//   // const x = canvasWidth / 2;
//   // const y = canvasHeight / 2;
//   // ctx.translate(x, y);
//   // ctx.rotate(rotation);
//   const { width, height } = logo;

//   // ctx.drawImage(logo, -width / 2, , width, height);

//   // let middlePos = canvas.width/2 - piece.width/2;

//   // // Brick stops when it gets to the middle of the canvas
//   // if(pieceLeftSidePos > middlePos) piece.x -= 2;
//   //  window.requestAnimationFrame(gameLoop)
//   // ctx.rotate(-rotation);
//   // ctx.translate(-x, -y);
// };

export const getAnimateCloud = (props: DrawProps) => {
  const { canvas, imageArray } = props;

  // const piece = { image: cloudImage, ...startPos, ...size };

  // cloudImage.onload = () => window.requestAnimationFrame(gameLoop);

  (function gameLoop() {
    const canvasCurrent = canvas.current;
    if (canvasCurrent && canvas) {
      const ctx = canvasCurrent.getContext('2d');
      if (ctx == null) return;

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      imageArray.forEach((piece) => {
        ctx.drawImage(piece.image, piece.startPos.x, piece.startPos.y);
        const pieceLeftSidePos = piece.startPos.x;

        // Brick stops when it gets to the middle of the canvas
        if (pieceLeftSidePos < 0 - piece.size.width - 20) {
          piece.startPos.x = canvasCurrent.width;
        }
        piece.startPos.x -= 2;
      });

      // Draw at coordinates x and y
      // ctx.drawImage(piece.image, piece.x, piece.y);
      // ctx.drawImage(piece.image, piece.x, piece.y + 20);

      window.requestAnimationFrame(gameLoop); // Needed to keep looping
    }
    // Clear canvas
  })();
};
