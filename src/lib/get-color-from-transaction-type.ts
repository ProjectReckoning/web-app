import { TransactionCategory } from "@/features/insight/constants/transaction-category.enum";
import { red, green, purple, tosca, limeGreen, orange, gray, pink } from "./custom-color";

export const transactionBackgroundColorMap: Record<TransactionCategory, string> = {
  [TransactionCategory.Sell]: tosca[100],
  [TransactionCategory.Topup]: orange[100],
  [TransactionCategory.Withdrawal]: purple[100],
  [TransactionCategory.Transfer]: pink[100],
  [TransactionCategory.Payment]: limeGreen[100],
  [TransactionCategory.Other]: gray[100],

  [TransactionCategory.Contribution]: purple[500],
  [TransactionCategory.AutoTopUp]: tosca[500],
  [TransactionCategory.AutoRecurring]: purple[400],
  [TransactionCategory.Income]: green[400],
  [TransactionCategory.Expense]: red[300],
};

export const transactionColorMap: Record<TransactionCategory, string> = {
  [TransactionCategory.Sell]: tosca[500],
  [TransactionCategory.Topup]: orange[500],
  [TransactionCategory.Withdrawal]: purple[500],
  [TransactionCategory.Transfer]: pink[500],
  [TransactionCategory.Other]: gray[500],

  [TransactionCategory.Contribution]: purple[500],
  [TransactionCategory.Payment]: limeGreen[500],
  [TransactionCategory.AutoTopUp]: tosca[500],
  [TransactionCategory.AutoRecurring]: purple[400],
  [TransactionCategory.Income]: green[400],
  [TransactionCategory.Expense]: red[300],
};

export function getBackgroundColorFromTransactionType(type: TransactionCategory): string {
  return transactionBackgroundColorMap[type] ?? gray[400];
}

export function getColorFromTransactionType(type: TransactionCategory): string {
  return transactionColorMap[type] ?? gray[400];
}
