import { Events } from './events.enum';

export type SocketEvents = {
  event: Events;
  roundId: number;
  nonce: number;
  multiplier: number;
  amount: number;
};
