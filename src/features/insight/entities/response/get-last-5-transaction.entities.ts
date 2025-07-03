export interface GetLast5TransactionResponse {
  ok: boolean;
  data: GetLast5TransactionResponseItem[];
  message: string;
  code: number;
}

export interface GetLast5TransactionResponseItem {
  type: string
  amount: number;
  description: string;
  transaction_type: 0 | 1;
  category: string;
}
