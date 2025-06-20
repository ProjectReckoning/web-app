import { TransactionCategory } from "@/features/insight/constants/transaction-category.enum";

const transactionIconMap: Record<TransactionCategory, string> = {
  [TransactionCategory.Contribution]: 'material-symbols:volunteer-activism',
  [TransactionCategory.Withdrawal]: 'material-symbols:account-balance-wallet',
  [TransactionCategory.Payment]: 'material-symbols:receipt',
  [TransactionCategory.AutoTopUp]: 'material-symbols:autorenew',
  [TransactionCategory.AutoRecurring]: 'material-symbols:schedule',
  [TransactionCategory.Topup]: 'material-symbols:trending-up',
  [TransactionCategory.Transfer]: 'material-symbols:compare-arrows',
  [TransactionCategory.Income]: 'material-symbols:attach-money',
  [TransactionCategory.Expense]: 'material-symbols:money-off',
};

export default function getIconFromTransactionType(type: TransactionCategory): string {
  return transactionIconMap[type] ?? 'material-symbols:help-outline';
}