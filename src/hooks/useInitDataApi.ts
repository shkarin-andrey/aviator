import { initData } from '../mock/initData';

const useInitDataApi = () => {
  const userGame = 'aviator';
  const webAppData = initData;

  return { webAppData, userGame };
};

export default useInitDataApi;
