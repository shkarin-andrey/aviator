import { TelegramGameProxy } from '../interfaces/telegram-game-proxy';
import { createContext, useContext } from 'react';

export type TelegramGameProxyModel = {
  tg: TelegramGameProxy;
};

export const TelegramGameProxyContext = createContext<TelegramGameProxyModel>({
  tg: (window as any).TelegramGameProxy,
} as any);

export function useTelegramGameProxy() {
  const { tg } = useContext(TelegramGameProxyContext);

  return tg;
}
