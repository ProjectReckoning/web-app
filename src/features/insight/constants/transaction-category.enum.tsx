export enum TransactionCategory {
  Contribution = 'Contribution',
  Withdrawal = 'Withdrawal',
  Payment = 'Payment',
  AutoTopUp = 'AutoTopUp',
  AutoRecurring = 'AutoRecurring',
  Topup = 'Topup',
  Transfer = 'Transfer',
  Income = 'Income',
  Expense = 'Expense',
}

export function getTransactionCateogryFromString(
  category: string
): TransactionCategory {
  const normalizedCategory = category.toLowerCase();

  switch (normalizedCategory) {
    case 'contribution':
      return TransactionCategory.Contribution;
    case 'withdrawal':
      return TransactionCategory.Withdrawal;
    case 'payment':
      return TransactionCategory.Payment;
    case 'autotopup':
      return TransactionCategory.AutoTopUp;
    case 'autorecurring':
      return TransactionCategory.AutoRecurring;
    case 'topup':
      return TransactionCategory.Topup;
    case 'transfer':
      return TransactionCategory.Transfer;
    case 'income':
      return TransactionCategory.Income;
    case 'expense':
      return TransactionCategory.Expense;
    default:
      throw new Error(`Unknown transaction category: ${category}`);
  }
}