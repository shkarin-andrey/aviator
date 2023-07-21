export interface TelegramGameProxy {
  initParams: {
    userId: string;
    userName: string;
    userChat: string;
    game: string;
    hash: string;
    tgShareScoreUrl: string;
  };
  onEvent(): void;
  shareScore(): void;
  paymentFormSubmit(): void;
}
