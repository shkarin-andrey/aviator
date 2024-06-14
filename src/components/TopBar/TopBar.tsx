import { FC } from 'react';
import { typeButtonOfNumber } from '../../utils/typeButtonOfNumber';
import Button from '../Button';

const data = [1, 1.5, 3, 4, 6, 10, 15, 25, 30, 35, 40, 45, 50, 55];

interface ITopBar extends React.HTMLAttributes<HTMLDivElement> {
  isStart: boolean;
  time: number;
}

const TopBar: FC<ITopBar> = ({ isStart, time, className = '', ...props }) => {
  return (
    <div {...props} className={`overflow-hidden w-full flex flex-col gap-3.5 h-[105px] justify-end ${className}`}>
      {!isStart && (
        <>
          <div
            className="font-bold text-[20px] text-white text-center tracking-[2px]"
            style={{
              textShadow: '#A77DFE -1px -1px 0px, #A77DFE 1px -1px 0px, #A77DFE -1px 1px 0px, #A77DFE 1px 1px 0px',
            }}
          >
            Time to next round
          </div>
          <div className="overflow-hidden mx-auto relative min-h-[9px] w-[220px] rounded-full border border-white bg-[#A77DFE]">
            <div
              className="transition-all duration-[1000ms] absolute left-0 top-0 h-full w-full bg-[#F20816] rounded-full"
              style={{
                transform: `translateX(${(time * 100) / 15 - 100}%`,
              }}
            />
          </div>
        </>
      )}
      <div className="overflow-x-auto py-1 flex items-center gap-3.5 ml-[25px] w-full">
        {data.map((item, index) => (
          <Button
            size="s"
            type={typeButtonOfNumber(item)}
            key={`history-item-${index}`}
            className="text-[20px] lowercase"
          >
            {item.toFixed(1)}x
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TopBar;
