import { FC, useMemo } from 'react';
import { classNameAfter, classNameBeforeAndAfter } from './Button.config';
import { IButton } from './Button.interface';

const Button: FC<IButton> = ({
  children,
  className = '',
  htmlType = 'submit',
  type = 'green',
  isFill = false,
  size = 'l',
  ...props
}) => {
  const classNameIsType = useMemo(() => {
    switch (type) {
      case 'green':
        return 'bg-[#4EC307] before:bg-[#A6F208] after:bg-[#67EB00]';

      case 'blue':
        return 'bg-[#0719C3] before:bg-[#0882F2] after:bg-[#62AEF4]';

      case 'dark-blue':
        return 'bg-[#0A125A] before:bg-[#143657] after:bg-[#4478A7]';

      case 'orange':
        return 'bg-[#C37807] before:bg-[#F29408] after:bg-[#F4BA62]';

      case 'purple':
        return 'bg-[#5A07C3] before:bg-[#6F08F2] after:bg-[#E062F4]';

      case 'red':
        return 'bg-[#C30707] before:bg-[#F20816] after:bg-[#F46262]';

      case 'dark-red':
        return 'bg-[#3C0101] before:bg-[#A2040E] after:bg-[#7A2222]';

      case 'yellow':
        return 'bg-[#FFB213] before:bg-[#FFEE88] after:bg-[#FFDB0A]';
    }
  }, [type]);

  const classNameSize = useMemo(() => {
    switch (size) {
      case 's':
        return 'text-[20px] border-[2px] px-4 pb-[7px] pt-1 before:-translate-x-[13px] before:-top-[3px] after:-top-[3px]';
      case 'l':
        return 'text-[32px] border-[3px] px-8 pb-2.5 pt-1.5 before:-translate-x-[17px] before:-top-[5px] after:-top-[5px]';
    }
  }, [size]);

  const classNameIsFill = useMemo(() => {
    if (isFill) {
      return classNameAfter;
    }

    return `shadow-[0_4px_0_0_rgba(0,0,0,.15)] ${classNameBeforeAndAfter}`;
  }, [isFill]);

  return (
    <button
      className={`transition-all duration-300 before:duration-300 after:duration-300 before:transition-all after:transition-all min-w-fit relative tracking-[1.28px] border-white rounded-full font-bold leading-none text-center uppercase pt-1.5 pb-2.5 text-white overflow-hidden disabled:bg-[#9A9A9A] disabled:after:bg-[#D5D5D5] ${classNameIsFill} ${classNameIsType} ${classNameSize} ${className}`}
      type={htmlType}
      {...props}
    >
      <span
        className="z-10 relative"
        style={{
          textShadow: '0 2px 0 rgba(0,0,0,.15)',
        }}
      >
        {children}
      </span>
    </button>
  );
};

export default Button;
