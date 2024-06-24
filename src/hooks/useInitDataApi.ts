import { useInitData, useInitDataRaw } from '@tma.js/sdk-react';
import { initData } from '../mock/initData';

const useInitDataApi = () => {
  const initData1 = useInitData();
  const initDataRaw = useInitDataRaw();

  console.log('initData: ', initData1);
  console.log('initDataRaw: ', initDataRaw);

  const userGame = 'aviator';
  const webAppData = initData;

  return { webAppData, userGame };
};

export default useInitDataApi;
