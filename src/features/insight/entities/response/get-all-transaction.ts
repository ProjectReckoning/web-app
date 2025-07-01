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
  description: string;
  type: "Income" | "Expense";
  destination_acc: string;
  category: string;
  amount: number;
  transaction_type: 0 | 1;
  createdAt: string;
}
