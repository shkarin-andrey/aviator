import { DefaultApiRequest } from './DefaultApiRequest.interface';

export interface CloseRequest extends DefaultApiRequest {
  betId: string;
  roundId: string;
}
