import { FC } from 'react';
import ButtonBet from '../ButtonBet';
import { TypeButton } from '../ButtonBet/ButtonBet.interfaces';
import ButtonScaleBet from '../ButtonScaleBet';
import Money from '../Money';
import { PropsBets } from './Bets.interfaces';

const Bets: FC<PropsBets> = (props) => {
  const { bet, setBet, money, addBet, minusBet } = props;
  const minimumBet = 10;

  const minBet = () => {
    setBet(minimumBet);
  };

  const x2Bet = () => {
    setBet(bet * 2);
  };

  const divideBet = () => {
    if (bet > minimumBet) {
      setBet(bet / 2);
    }
  };

  const allInBet = () => {
    setBet(money);
  };

  return (
    <div className="py-[10px] px-[17px] bg-[#DFF9FF] rounded-[21px] shadow">
      <div className="flex flex-col bg-white rounded-[7px] shadow-bets mb-3">
        <div className="w-full bg-[#3ECEFE] text-white rounded-t-[7px] text-left pl-4 text-lg font-bold tracking-[0.64px]">
          BET
        </div>
        <div className="flex flex-row gap-9 w-full pl-4 justify-between py-2">
          <div className="flex items-center justify-start">
            <Money
              money={Number(bet).toFixed()}
              classNameText="text-[28px] text-[#7454FD]"
              moneyHeight="18"
              moneyWidth="18"
            />
          </div>
          <div className="flex flex-row gap-3 pr-2 items-center">
            <ButtonBet onClick={addBet} typeButton={TypeButton.Plus} />
            <ButtonBet onClick={minusBet} typeButton={TypeButton.Minus} />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-1 justify-center w-full">
        <a href="https://t.me/the_aviator_game_bot?game=aviator" target={'_blank'}>
          <ButtonScaleBet className="bg-[#4CDAFE] button-deposit w-[95px]" onClick={minBet} text={'Deposit'} />
        </a>
        <ButtonScaleBet className="bg-[#FFDD17] button-allin w-[95px]" onClick={allInBet} text={'All in'} />
      </div>
    </div>
  );
};

export default Bets;
