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
  initValue: StartPosition;
  small: boolean;
};

interface DrawProps {
  canvas: React.MutableRefObject<HTMLCanvasElement | null>;
  imageArray: ImageArray[];
  startGame: boolean;
  airplane: HTMLImageElement;
  airplanePos: StartPosition;
}

export const getAnimateCloud = (props: DrawProps) => {
  const { canvas, imageArray, startGame, airplane, airplanePos } = props;
  let top = true;

  (function gameLoop() {
    const canvasCurrent = canvas.current;

    if (canvasCurrent && canvas) {
      const ctx = canvasCurrent.getContext('2d');
      if (ctx == null) return;

      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      imageArray.forEach((piece) => {
        ctx.drawImage(piece.image, piece.startPos.x, piece.startPos.y);
        const pieceLeftSidePos = piece.startPos.x;
        // const pieceHeightSidePos = piece.startPos.y;

        if (pieceLeftSidePos < 0 - piece.size.width - 20) {
          if (piece.small) {
            piece.startPos.x = canvasCurrent.width + piece.size.width * 2 + 20;
            // piece.startPos.y = piece.initValue.y;
          } else {
            piece.startPos.x = canvasCurrent.width + piece.size.width + 20;
            // piece.startPos.y = piece.initValue.y;
          }
        }

        if (startGame) {
          if (piece.small) {
            piece.startPos.x -= 1;
            // piece.startPos.y += 0.5;
          } else {
            piece.startPos.x -= 1;
            // piece.startPos.y += 0.5;
          }
        } else {
          piece.startPos.x -= 1.5;
        }
      });

      ctx.drawImage(airplane, airplanePos.x, airplanePos.y);

      if (airplanePos.y > 150 && top) {
        airplanePos.y -= 0.3;
        top = false;
      } else if (airplanePos.y < 50 && !top) {
        airplanePos.y += 0.3;
        top = true;
      } else if (top) {
        airplanePos.y += 0.3;
      } else if (!top) {
        airplanePos.y -= 0.3;
      }

      window.requestAnimationFrame(gameLoop); // Needed to keep looping
    }
  })();
};
