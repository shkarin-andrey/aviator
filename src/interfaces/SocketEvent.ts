import { GameEvents } from './GameEvents.enum';

export type SocketEvents = {
  event: GameEvents;
  roundId: string;
  nonce: number;
  multiplier: number;
  amount?: number;
};
