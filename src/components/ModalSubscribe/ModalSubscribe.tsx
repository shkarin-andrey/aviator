import { FC, useState } from 'react';
import Modal from '../Modal';

const ModalSubscribe: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} handleClose={handleClose} title="Limit increase">
      <div className="w-[84px] h-[84px] rounded-full overflow-hidden mt-5 mx-auto">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmCy16nhIbV3pI1qLYHMJKwbH2458oiC9EmA&s"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-[185px] mt-[10px] text-[#515151] text-base leading-5 text-center">
        You must subscribe to the channel to continue
      </div>
      <button onClick={handleClose} className="px-4 py-2 bg-[#05F] font-normal text-[14px] mt-5 rounded-md text-white">
        Subscribe
      </button>
    </Modal>
  );
};

export default ModalSubscribe;
