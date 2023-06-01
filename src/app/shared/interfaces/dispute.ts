import { Creator, Actor } from './auth';

export interface Dispute {
  id: number;
  description?: string;
  created_at?: string;
  closed_at?: string | null;
  start_date?: string;
  end_date?: string;
  status?: string;
  creator?: Creator;
  arbitrator?: Creator | null;
  claimer?: Actor | null;
  respondent?: Actor | null;
  code?: string;
  type?: string;
  respondent_invitation_status?: string;
  claimer_invitation_status?: string;
  claim?: Claim | null;
  contains_witness?: boolean;
}

export interface Claim {
  id: number;
  dispute: number;
  description: string;
  created_at: string;
  updated_at: string;
  claimed_amount: string | number;
}

export interface SettlementAgreement {
  id: number;
  dispute: number;
  content: string;
  created_at: string;
  updated_at: string;
}
