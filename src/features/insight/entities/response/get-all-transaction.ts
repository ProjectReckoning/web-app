export interface GetAllTransactionResponse {
  ok: boolean;
  data: {
    saldoKemarin: string;
    saldoPenutupan: string;
    transaksi: GetAllTransactionResponseItem[];
    pemasukan: string;
    pengeluaran: string;
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
