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
  const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  switch (normalizedCategory) {
    case 'Contribution':
      return TransactionCategory.Contribution;
    case 'Withdrawal':
      return TransactionCategory.Withdrawal;
    case 'Payment':
      return TransactionCategory.Payment;
    case 'AutoTopUp':
      return TransactionCategory.AutoTopUp;
    case 'AutoRecurring':
      return TransactionCategory.AutoRecurring;
    case 'Topup':
      return TransactionCategory.Topup;
    case 'Transfer':
      return TransactionCategory.Transfer;
    case 'Income':
      return TransactionCategory.Income;
    case 'Expense':
      return TransactionCategory.Expense;
    default:
      throw new Error(`Unknown transaction category: ${category}`);
  }
}