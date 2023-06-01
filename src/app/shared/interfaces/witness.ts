import { User, Creator } from './auth';

export interface Witness {
  id: number;
  user: User;
  account: any;
  type: 'witness';
  phone_number: string;
  created_at: string;
  signed_up_at: string;
  relation: string;
  creator: null | Creator;
  invitation_url: null | string;
}
