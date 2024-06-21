export interface UserInfoResponse {
  id: string;
  balance: number;
  isCanPlay: boolean;
  isSubscribed: boolean;
  rounds: number[];
  channelImage: string;
  channelInviteLink: string;
}
