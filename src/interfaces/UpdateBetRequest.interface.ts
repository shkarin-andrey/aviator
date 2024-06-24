import { DefaultApiRequest } from './DefaultApiRequest.interface';

export type TAmountBet = 1 | 2 | 5;

export interface UpdateBetRequest extends DefaultApiRequest {
  amount: TAmountBet;
}
