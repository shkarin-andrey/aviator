import { Events } from './Events.enum';

export type SocketEvents = {
  event: Events;
  roundId: number;
  nonce: number;
  multiplier: number;
  amount: number;
};
