import { FC } from 'react';

import { IInput } from './Input.interface';

const Input: FC<IInput> = ({ className = '', labelClassName = '', id, label, ...props }) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className={`text-xs text-[#0055FF] ${labelClassName}`} htmlFor={id}>
          {label}:
        </label>
      )}
      <input
        id={id}
        type="text"
        className={`w-full px-3 py-2 text-sm outline-none border-2 border-[#0055FF] rounded-md ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
