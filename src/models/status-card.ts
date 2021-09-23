import Comment from './comment'
export interface StatusCard {
  id: number;
  name: string;
  username: string;
  profileImage: string;
  comments: Comment[];
  totalClaps: number;
}

export default StatusCard;
