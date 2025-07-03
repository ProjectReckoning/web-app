import { TransactionCategory } from "@/features/insight/constants/transaction-category.enum";

export const transactionLabelMap: Record<TransactionCategory, string> = {
  // Income category
  [TransactionCategory.Sell]: "Penjualan",
  [TransactionCategory.Topup]: "Top Up",

  // Expense Category
  [TransactionCategory.Salary]: "Gaji",
  [TransactionCategory.Withdrawal]: "Withdraw",
  [TransactionCategory.Purchase]: "Pembelian",
  [TransactionCategory.Transfer]: "Pemindahan Dana",

  [TransactionCategory.Other]: "Lainnya",

  // Deprecated
  [TransactionCategory.AutoTopUp]: "Auto Top Up",
  [TransactionCategory.Payment]: "Payment",
  [TransactionCategory.Contribution]: "Kontribusi",
  [TransactionCategory.AutoRecurring]: "Transaksi Terjadwal",
  [TransactionCategory.Income]: "Pemasukan",
  [TransactionCategory.Expense]: "Pengeluaran",
};

export function getLabelFromTransactionType(type: TransactionCategory): string {
  return transactionLabelMap[type] ?? "Lainnya";
}
