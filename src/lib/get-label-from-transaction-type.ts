import { TransactionCategory } from "@/features/insight/constants/transaction-category.enum";

export const transactionLabelMap: Record<TransactionCategory, string> = {
  [TransactionCategory.Sell]: "Penjualan",
  [TransactionCategory.Topup]: "Top Up",
  [TransactionCategory.Withdrawal]: "Withdraw",
  [TransactionCategory.Transfer]: "Transfer",
  [TransactionCategory.Payment]: "Payment",
  [TransactionCategory.Other]: "Lainnya",

  [TransactionCategory.Contribution]: "Kontribusi",
  [TransactionCategory.AutoTopUp]: "Auto Top Up",
  [TransactionCategory.AutoRecurring]: "Transaksi Terjadwal",
  [TransactionCategory.Income]: "Pemasukan",
  [TransactionCategory.Expense]: "Pengeluaran",
};

export function getLabelFromTransactionType(type: TransactionCategory): string {
  return transactionLabelMap[type] ?? "Lainnya";
}
