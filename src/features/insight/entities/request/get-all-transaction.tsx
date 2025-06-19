export interface GetAllTransactionResponse {
  ok: boolean;
  data: GetAllTransactionResponseItem[];
  message: string;
  code: number;
}

export interface GetAllTransactionResponseItem {
  initiator_user: string;
  type: string;
  amount: number;
  purpose: string;
  transaction_type: 0 | 1;
  created_at: string;
}
