import { FC } from 'react';
import MinusIcon from '../../assets/svg/MinusIcon';
import PlusIcon from '../../assets/svg/PlusIcon';
import { PropsButtonBet, TypeButton } from './ButtonBet.interfaces';

const ButtonBet: FC<PropsButtonBet> = (props) => {
  const { onClick, typeButton } = props;

  return (
    <button type="button" onClick={onClick} className="w-[40px] h-6">
      {typeButton === TypeButton.Plus ? <PlusIcon /> : <MinusIcon />}
    </button>
  );
};

export default ButtonBet;
