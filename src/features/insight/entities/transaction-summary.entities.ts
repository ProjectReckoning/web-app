import { TransactionCategory } from "../constants/transaction-category.enum";
import { TransactionType } from "../constants/transaction-type.enum";

export interface TransactionSummaryEntity {
  type: TransactionCategory;
  amount: number;
  description: string;
  transactionType: TransactionType; // 0 for INCOME, 1 for OUTCOME
}