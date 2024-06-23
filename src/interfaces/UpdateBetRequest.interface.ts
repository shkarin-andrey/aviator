import { DefaultApiRequest } from './DefaultApiRequest.interface';

export interface UpdateBetRequest extends DefaultApiRequest {
  amount: number;
}
