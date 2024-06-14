import { FC, useState } from 'react';
import Layout from '../components/Layout';
import ModalSubscribe from '../components/ModalSubscribe';
import PlayView from '../components/PlayView';
import StartView from '../components/StartView';

const BetsPage: FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleIsPlaying = () => {
    setIsPlaying(true);
  };

  return (
    <Layout isPlaying={isPlaying}>
      <div className="absolute left-0 top-[13%] h-[calc(100vh-50%)] w-full flex items-center marquee scroll-animate" />
      <div className="bg-[#D96DFF] blur-[51px] rounded-full h-[70px] w-[200px] absolute left-1/2 top-[70%] -translate-x-1/2" />
      {!isPlaying && <StartView onPlay={handleIsPlaying} />}

      {isPlaying && <PlayView />}
      <ModalSubscribe />
    </Layout>
  );
};
export default BetsPage;
