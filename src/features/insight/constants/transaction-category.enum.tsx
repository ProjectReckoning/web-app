export enum TransactionCategory {
  // Income Category
  Sell = 'Sell',
  Topup = 'Topup',

  // Expense Category
  Salary = 'Salary',
  Withdrawal = 'Withdrawal',
  Purchase = 'Purchase',
  Transfer = 'Transfer',

  Other = 'Other',

  // Deprecated
  AutoTopUp = 'AutoTopUp',
  Contribution = 'Contribution',
  Payment = 'Payment',
  AutoRecurring = 'AutoRecurring',
  Income = 'Income',
  Expense = 'Expense',
}

export function getTransactionCategoryFromString(
  category: string
): TransactionCategory {
  const normalizedCategory = category.toLowerCase();

  /**
   * 1. Penjualan : payment
   * 2. Top up : AutoTopUp, TopUp, AutoRecurring, Contiribution
   * 3. Withdraw : Withdrawal
   * 4. Transfer : Transfer
   * 5. Lainnya : itu yg income sama expense masuknya ke lainnya
   */
  switch (normalizedCategory) {
    case 'penjualan':
    case 'payment':
    case 'sell':
      return TransactionCategory.Sell;

    case 'topup':
    case 'top up':
    case 'autotopup':
    case 'autorecurring':
    case 'contribution':
      return TransactionCategory.Topup;

    case 'withdraw':
    case 'withdrawal':
      return TransactionCategory.Withdrawal;

    case 'transfer':
    case 'autobudget':
    case 'pemindahan dana':
      return TransactionCategory.Transfer;

    case 'gaji':
    case 'salary':
      return TransactionCategory.Salary;

    case 'pembelian':
      return TransactionCategory.Purchase;
    default:
      return TransactionCategory.Other;
  }
}