import { Dispute } from './dispute';

export interface Role {
  type: string;
}

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  email: string;
  address: Address[] | null;
  actor: Actor;
  creator?: number;
  type?: string;
  dispute?: Dispute;
  disputes?: number[];
  permissions: string[];
  is_superuser: boolean;
}

export interface Creator {
  id: number;
  display_picture: string;
  user: User;
  account: string;
  type: string;
  category: string | null;
  company: string | null;
  phone_number: string;
}

export interface Actor {
  id: number;
  display_picture: string;
  user: User;
  account: any;
  type: string;
  category: string | null;
  company: string | null;
  phone_number: string;
  created_at: string;
  signed_up_at: string;
  invitation_url: string | null;
}
export interface Address {
  first_address: String;
  second_address: String;
  city: String;
  state: String;
  zip: String;
}
