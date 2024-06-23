import { DefaultApiRequest } from './DefaultApiRequest.interface';

export interface WithdrawRequest extends DefaultApiRequest {
  credentials: string;
  amount: number;
}
