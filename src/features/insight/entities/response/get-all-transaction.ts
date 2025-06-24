export interface GetAllTransactionResponse {
  ok: boolean;
  data: {
    saldo_kemarin: number;
    saldo_penutupan: number;
    transaksi: GetAllTransactionResponseItem[];
    total_pemasukan: number;
    total_pengeluaran: number;
  }
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
