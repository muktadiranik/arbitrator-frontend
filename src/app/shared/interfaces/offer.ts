export interface Offer {
  id: number;
  offered_amount: string;
  currency: string;
  status: string;
  creator: number;
  created_at: string;
  updated_at: string;
  claimed_amount: number;
  claim: number;
  offer_accepted_modal_rendered: boolean;
  offer_received_modal_rendered: boolean;
}
