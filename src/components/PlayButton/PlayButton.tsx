import { FC } from 'react';
import { PropsPlayButton } from './PlayButton.interfaces';

const PlayButton: FC<PropsPlayButton> = (props) => {
  const { onClick, text, className, disabled = false } = props;
  return (
    <div>
      <button
        disabled={disabled}
        className={`${className} py-[6px] px-[14px] text-[32px] font-bold uppercase`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};
export default PlayButton;
