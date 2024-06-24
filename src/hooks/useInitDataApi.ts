const useInitDataApi = () => {
  const userGame = 'aviator';
  const webAppData = window.location.hash;

  return { webAppData, userGame };
};

export default useInitDataApi;
