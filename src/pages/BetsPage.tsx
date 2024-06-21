import { FC, useState } from 'react';
import Layout from '../components/Layout';
import ModalSubscribe from '../components/ModalSubscribe';
import PlayView from '../components/PlayView';
import StartView from '../components/StartView';

import { ReactComponent as CloudsSvg } from '../assets/svg/clouds.svg';

const BetsPage: FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleIsPlaying = () => {
    setIsPlaying(true);
  };

  return (
    <Layout isPlaying={isPlaying}>
      <div className="absolute top-[13%] h-1/2 flex items-center w-full overflow-hidden">
        <CloudsSvg className="marquee h-full min-w-fit object-cover" />
        <CloudsSvg className="marquee h-full min-w-fit object-cover" />
        <CloudsSvg className="marquee h-full min-w-fit object-cover" />
        <CloudsSvg className="marquee h-full min-w-fit object-cover" />
        <CloudsSvg className="marquee h-full min-w-fit object-cover" />
      </div>
      <div className="bg-[#D96DFF] blur-[51px] rounded-full h-[70px] w-[200px] absolute left-1/2 top-[70%] -translate-x-1/2" />
      {!isPlaying && <StartView onPlay={handleIsPlaying} />}

      {isPlaying && <PlayView />}
      <ModalSubscribe />
    </Layout>
  );
};
export default BetsPage;
