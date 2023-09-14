import { FC } from 'react';
import CoinRewardIcon from '../../assets/svg/CoinRewardIcon';
import GetRewardIcon from '../../assets/svg/GetRewardIcon';
import PlayButton from '../PlayButton';
import { ModalProps } from './Modal.interfaces';

const Modal: FC<ModalProps> = (props) => {
  const { share, onChangeModal } = props;

  const handleShare = () => {
    share();
    onChangeModal();
  };

  return (
    <div className="fixed z-[9999] top-0 bottom-0 left-0 right-0 bg-modal w-full h-full">
      <div className="absolute bottom-[60px] w-full flex items-center justify-center flex-col">
        <div className="h-[240px] w-[190px]">
          <div className={`absolute -top-[100px] left-[52%] -translate-x-[52%]`}>
            <GetRewardIcon />
          </div>
          <div className="bg-white flex flex-col rounded-xl p-2 gap-3 h-[240px] w-[190px] px-[26px]">
            <p className="mt-[40px] mb-1 text-[#F52841] text-xl font-bold">Balance = 0</p>
            <p className="mb-1 text-lg font-extrabold text-[#60CFFF] -tracking-[0.6px]">
              Send this game in chat and get
            </p>
            <div className="flex flex-row w-full items-center justify-center">
              <CoinRewardIcon height="38" width="54" />
              <span className="text-[#60CFFF] text-4xl font-bold">100</span>
            </div>
          </div>
        </div>
        <PlayButton
          onClick={handleShare}
          text="Share"
          className="button-play bg-[#67EB00] text-2xl !px-[30px] tracking-[0.64px] mt-4 mb-8"
        />
        <p className="uppercase text-[#DFDFDF] text-xl font-bold" onClick={onChangeModal}>
          not now...
        </p>
      </div>
    </div>
  );
};

export default Modal;
