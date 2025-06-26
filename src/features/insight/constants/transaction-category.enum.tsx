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
  Sell = 'Sell',
  Other = 'Other',
}

export function getTransactionCateogryFromString(
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
    case 'payment':
      return TransactionCategory.Payment;

    case 'topup':
    case 'autotopup':
    case 'autorecurring':
    case 'contribution':
      return TransactionCategory.Topup;

    case 'withdrawal':
      return TransactionCategory.Withdrawal;

    case 'transfer':
      return TransactionCategory.Transfer;

    case 'income':
    case 'expense':
      return TransactionCategory.Other;
    default:
      return TransactionCategory.Other;
  }
}