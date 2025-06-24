import { TransactionCategory } from "../constants/transaction-category.enum";
import { TransactionType } from "../constants/transaction-type.enum";

export interface TransactionEntity {
  initiatorUser: string;
  type: TransactionCategory;
  amount: number;
  purpose: string;
  transactionType: TransactionType; // 0 for INCOME, 1 for OUTCOME
  createdAt: string;
}