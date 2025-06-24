import { TransactionCategory } from "@/features/insight/constants/transaction-category.enum";
import { red, green, purple, tosca, limeGreen, orange, gray } from "./custom-color";

export const transactionColorMap: Record<TransactionCategory, string> = {
  [TransactionCategory.Contribution]: purple[500],       // spiritualitas, penghargaan
  [TransactionCategory.Withdrawal]: red[400],            // kehilangan uang
  [TransactionCategory.Payment]: limeGreen[500],         // stabilitas finansial
  [TransactionCategory.AutoTopUp]: tosca[500],           // otomatisasi, teknologi
  [TransactionCategory.AutoRecurring]: purple[400],      // konsistensi, siklus
  [TransactionCategory.Topup]: orange[400],              // dorongan positif
  [TransactionCategory.Transfer]: tosca[400],            // aliran uang
  [TransactionCategory.Income]: green[400],              // pendapatan, pertumbuhan
  [TransactionCategory.Expense]: red[300],               // pengeluaran
};

export function getColorFromTransactionType(type: TransactionCategory): string {
  return transactionColorMap[type] ?? gray[400];
}
